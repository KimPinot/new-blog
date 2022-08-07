import * as F from "fp-ts/function";
import * as A from "fp-ts/Array";
import * as S from "fp-ts/string";
import * as D from "fp-ts/Date";
import * as O from "fp-ts/Ord";
import { readdir } from "fs/promises";
import path from "path";
import { getMetadata, Metadata } from "./article";
import { promiseAll } from "modules/utils/promise";

const readDirWithoutFiletypes = (path: string) => readdir(path, { withFileTypes: false });

const deleteMdFileExtension = (filename: string) => F.pipe(filename, S.replace(".mdx", ""));

const staticPathObj = (filename: string) => ({
  params: {
    filename,
  },
});

const staticPath = (filename: string) => F.pipe(filename, deleteMdFileExtension, staticPathObj);

const readDir = (targetDir: string) => F.pipe(targetDir, path.resolve, readDirWithoutFiletypes);
const dirToStaticPath = (files: string[]) => F.pipe(files, A.map(staticPath));

export const getPostsStaticParms = async () => F.pipe(await readDir("./posts"), dirToStaticPath);

const getFilenames = async () => F.pipe(await readdir("./posts"), A.map(deleteMdFileExtension));
const sortByDate = F.pipe(
  D.Ord,
  O.contramap((i: Metadata) => i.date),
  O.reverse,
);
export const getPosts = async () => F.pipe(await getFilenames(), A.map(getMetadata), promiseAll);
export const getSortedPosts = async () => F.pipe(await getPosts(), A.sort(sortByDate));
