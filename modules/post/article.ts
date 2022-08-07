import * as F from "fp-ts/function";
import fs from "fs/promises";
import path from "path";
import { bundleMDX } from "mdx-bundler";
import { joinObject, pick } from "modules/utils/object";

export type Metadata = {
  title: string;
  description: string;
  tags: string[];
  categories: string[];
  date: Date;
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
};
export const render = (markdown: string): Promise<RenderReturns> =>
  bundleMDX({
    source: markdown,
    cwd: path.resolve(),
  });

const filenameToRender = async (filename: string) => F.pipe(await openMdx(filename), render);

export async function getContent(filename: string): Promise<string> {
  return F.pipe(await filenameToRender(filename), pick("code"));
}

export async function getMetadata(filename: string): Promise<MetaDataWithFilename> {
  return F.pipe(await filenameToRender(filename), pick("frontmatter"), joinObject({ filename }));
}
