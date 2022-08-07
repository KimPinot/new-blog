import * as F from "fp-ts/function";
import fs from "fs/promises";
import { bundleMDX } from "mdx-bundler";
import path from "path";

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
