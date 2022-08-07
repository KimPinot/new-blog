import * as F from "fp-ts/function";
import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";
import { compileMdx } from "./mdx";

const readFile = (dir: string) => (filename: string) => (extension: string) =>
  fs.readFile(path.join(path.resolve(dir), `${filename}.${extension}`), "utf-8");

const matterObjToObj = async (matter: matter.GrayMatterFile<string>) => ({
  content: (await compileMdx(matter.content)).value,
  meta: matter.data,
});

const matterExcludeExcerpt = (markdown: string) => matter(markdown, { excerpt: false });
export const getMattered = (markdown: string) => F.pipe(markdown, matter, matterObjToObj);
export const getArticle = async (filename: string) => F.pipe(await readFile("./posts")(filename)("mdx"), getMattered);
