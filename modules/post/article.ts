import * as F from "fp-ts/function";
import fs from "fs/promises";
import path from "path";
import { bundleMDX } from "mdx-bundler";
import { joinObject, pick } from "modules/utils/object";
import remarkGfm from "remark-gfm";
import matter from "gray-matter";
import remarkGithub from "remark-github";
import remarkGemoji from "remark-gemoji";
import remarkBreaks from "remark-breaks";
import { nodeTypes } from "@mdx-js/mdx";
import rehypeRaw from "rehype-raw";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkMermaid from "remark-mermaidjs";
import rehypeHighlight from "rehype-highlight";
import remarkMdx from "remark-mdx";
// @ts-ignore
import rehypeAddClasses from "rehype-add-classes";
const rehypeWrap = require("rehype-wrap");

export type Metadata = {
  title: string;
  description: string;
  tags: string[];
  categories: string[];
  date: number;
  list?: boolean;
};

export type MetaDataWithFilename = Metadata & {
  filename: string;
};

const readFile = (dir: string) => (filename: string) => (extension: string) =>
  fs.readFile(path.join(path.resolve(dir), `${filename}.${extension}`), "utf-8");

const openMdx = (filename: string) =>
  readFile("./posts")(filename)("mdx").catch(() => readFile("./posts")(filename)("md"));

type RenderReturns = {
  code: string;
  frontmatter: Metadata;
  matter: {
    content: string;
  };
};
export const render = (markdown: string): Promise<RenderReturns> =>
  bundleMDX({
    source: markdown,
    cwd: path.resolve(),
    mdxOptions: (options) => ({
      ...options,
      remarkPlugins: [
        remarkGfm,
        [
          remarkGithub,
          {
            repository: "KimPinot/new-blog",
          },
        ],
        remarkGemoji,
        remarkBreaks,
      ],
      rehypePlugins: [[rehypeRaw, { passThrough: nodeTypes }]],
    }),
  });

const filenameToRender = async (filename: string) => F.pipe(await openMdx(filename), render);
const matterContent = async (filename: string) => F.pipe(await openMdx(filename), matter, pick("content"), render);

export async function getContent(filename: string): Promise<string> {
  return F.pipe(await matterContent(filename), pick("code"));
}

export async function getMetadata(filename: string): Promise<MetaDataWithFilename> {
  const { date, ...rest } = F.pipe(await filenameToRender(filename), pick("frontmatter"), joinObject({ filename }));
  return {
    ...rest,
    date: +date,
  };
}

export const _unified = (markdown: string) =>
  unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkGfm)
    .use(remarkGithub, {
      repository: "KimPinot/new-blog",
    })
    .use(remarkGemoji)
    .use(remarkBreaks)
    .use(remarkMermaid, {
      launchOptions: {},
    })
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(rehypeHighlight, { subset: false })
    .use(rehypeAddClasses, {
      h1: "text-2xl",
      h2: "text-xl",
      h3: "text-lg",
      h4: "text-base",
      "h1, h2, h3, h4": "font-bold mt-4",
      "code:not(.hljs)": "py-[1px] px-[4px] rounded-md bg-slate-100 text-[14px] text-stale-600",
      "input[type=checkbox]": "inline-block checkbox checkbox-sm -mb-1",
      a: "link link-hover link-primary underline-offset-4",
      "ul, ol": "pl-5",
      ul: "list-disc",
      ol: "list-decimal",
      img: "card",
      table: "table",
    })
    .use(rehypeWrap, { selector: "table", wrapper: "div.overflow-x-auto.w-full" })
    .process(markdown);

export const readPost = async (filename: string) => {
  let file: string;
  try {
    file = await readFile("./posts")(filename)("mdx");
  } catch (e) {
    file = await readFile("./posts")(filename)("md");
  }
  const { content: _content, data: metadata } = matter(file);
  const __html = await _unified(_content);
  return {
    metadata,
    __html: String(__html),
  };
};
