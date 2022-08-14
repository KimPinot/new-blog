import * as F from "fp-ts/function";
import * as A from "fp-ts/Array";
import * as S from "fp-ts/string";
import * as N from "fp-ts/number";
import * as O from "fp-ts/Ord";
import { readdir } from "fs/promises";
import { isNotJunk } from "junk";
import { getMetadata, Metadata } from "./article";
import { promiseAll } from "modules/utils/promise";
import { pick } from "modules/utils/object";
import { Dirent } from "fs";

const deleteMdFileExtension = (filename: string) => F.pipe(filename, S.replace(/.md(x)?/g, ""));

const staticPathObj = (filename: string) => ({
  params: {
    filename,
  },
});

const staticPath = (filename: string) => F.pipe(filename, deleteMdFileExtension, staticPathObj);
const dirToStaticPath = (files: string[]) => F.pipe(files, A.map(staticPath));

const isNotFolder = (i: Dirent) => !i.isDirectory();
const getFilenames = async () =>
  F.pipe(
    await readdir("./posts", { withFileTypes: true }),
    A.filter(isNotFolder),
    A.map(pick("name")),
    A.filter(isNotJunk),
    A.map(deleteMdFileExtension),
  );
const sortByDate = F.pipe(
  N.Ord,
  O.contramap((i: Metadata) => i.date),
  O.reverse,
);
const keepNotListHidden = (i: Metadata) => !i.hide?.list;

const groupBy = (aaaaa: Map<string, Metadata[]>) => (i: Metadata[]) =>
  F.pipe(
    i,
    A.map((article) => {
      const category = article.categories?.[0] || "No Category";
      const a = aaaaa.get(category) || [];
      aaaaa.set(category, [...a, article]);
    }),
    () => aaaaa,
    Object.fromEntries,
    Object.keys,
    A.sort(F.pipe(S.Ord)),
    (map) => new Map(map.map((i) => [i, aaaaa.get(i)])),
    Object.fromEntries,
  );

export const getPostsStaticParams = async () => F.pipe(await getFilenames(), dirToStaticPath);
export const getPosts = async () => F.pipe(await getFilenames(), A.map(getMetadata), promiseAll);
export const getSortedPosts = async () => F.pipe(await getPosts(), A.filter(keepNotListHidden), A.sort(sortByDate));
export const getCategories = async () => F.pipe(await getSortedPosts(), groupBy(new Map()));
