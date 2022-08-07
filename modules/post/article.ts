import * as F from "fp-ts/function";
import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";
import { bundleMDX } from "mdx-bundler";
import { joinObject } from "modules/utils/object";

const readFile = (dir: string) => (filename: string) => (extension: string) =>
  fs.readFile(path.join(path.resolve(dir), `${filename}.${extension}`), "utf-8");

export const getRender = async (markdown: string) =>
  F.pipe(
    await bundleMDX({
      source: markdown,
      cwd: path.resolve(),
    }),
  );
export const getArticle = async (filename: string) => F.pipe(await readFile("./posts")(filename)("mdx"), getRender);

const getMatterMeta = (markdown: string): Record<string, any> => matter(markdown).data;
export const meta = async (filename: string) =>
  F.pipe(await readFile("./posts")(filename)("mdx"), getMatterMeta, joinObject({ filename }));
