import remarkGfm from "remark-gfm";
import matter from "gray-matter";
import remarkGithub from "remark-github";
import remarkGemoji from "remark-gemoji";
import remarkBreaks from "remark-breaks";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkMermaid from "remark-mermaidjs";
import rehypeHighlight from "rehype-highlight";
import remarkMdx from "remark-mdx";
// @ts-ignore
import rehypeAddClasses from "rehype-add-classes";
import { readFile } from "modules/utils/file";
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


export async function getMetadata(filename: string) {
  const file = await getFile(filename);
  return {
    filename,
    ...matter(file).data,
  } as MetaDataWithFilename;
}

async function getFile(filename: string) {
  let file: string;
  try {
    file = await readFile("./posts")(filename)("mdx");
  } catch (e) {
    // fall-back markdown
    file = await readFile("./posts")(filename)("md");
  }
  return file;
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
      svgo: null,
    })
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(rehypeHighlight, { subset: false, ignoreMissing: true })
    .use(rehypeAddClasses, {
      h1: "markdown-h1 text-2xl",
      h2: "markdown-h2 text-xl",
      h3: "markdown-h3 text-lg",
      h4: "markdown-h4 text-base",
      "h1, h2, h3, h4": "font-bold mt-4",
      "code:not(.hljs)": "py-[1px] px-[4px] rounded-md bg-slate-100 text-stale-600",
      "input[type=checkbox]": "inline-block checkbox checkbox-sm -mb-1",
      a: "link link-hover link-primary underline-offset-4",
      "ul, ol": "pl-5",
      ul: "markdown-ul list-disc",
      ol: "markdown-ol list-decimal",
      img: "markdown-img card",
      table: "markdown-table table",
    })
    .use(rehypeWrap, { selector: "table", wrapper: "div.overflow-x-auto.w-full", fallback: false })
    .process(markdown);

export const readPost = async (filename: string) => {
  const file = await getFile(filename);
  const { content: _content, data: metadata } = matter(file);
  const __html = await _unified(_content);
  return {
    metadata,
    __html: String(__html),
  };
};
