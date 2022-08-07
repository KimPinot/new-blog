import * as F from "fp-ts/function";
import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";
import { bundleMDX } from "mdx-bundler";
import { joinObject, pick } from "modules/utils/object";

const readFile = (dir: string) => (filename: string) => (extension: string) =>
  fs.readFile(path.join(path.resolve(dir), `${filename}.${extension}`), "utf-8");

const openMdx = (filename: string) => readFile("./posts")(filename)("mdx");

export const render = (markdown: string) =>
  bundleMDX({
    source: markdown,
    cwd: path.resolve(),
  });

const filenameToRender = async (filename: string) => F.pipe(await openMdx(filename), render);

export async function getContent(filename: string) {
  return F.pipe(await filenameToRender(filename), pick("code"));
}

export async function getMetadata(filename: string) {
  return F.pipe(await filenameToRender(filename), pick("frontmatter"), joinObject({ filename }));
}
