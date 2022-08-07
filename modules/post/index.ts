import * as F from "fp-ts/function";
import * as A from "fp-ts/Array";
import * as S from "fp-ts/string";
import { readdir } from "fs/promises";
import path from "path";

const readDirWithoutFiletypes = (path: string) => readdir(path, { withFileTypes: false });

const deleteMdFileExtension = (filename: string) => F.pipe(filename, S.replace(".md", ""));

const staticPathObj = (filename: string) => ({
  params: {
    filename,
  },
});

const staticPath = (filename: string) => F.pipe(filename, deleteMdFileExtension, staticPathObj);

const readDir = (targetDir: string) => F.pipe(targetDir, path.resolve, readDirWithoutFiletypes);
const dirToStaticPath = (files: string[]) => F.pipe(files, A.map(staticPath));

export const getPostsStaticParms = async () => F.pipe(await readDir("./posts"), dirToStaticPath);
export const getPostsList = async () => F.pipe(await readdir("./posts"), A.map(deleteMdFileExtension));
