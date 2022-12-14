import * as A from "fp-ts/Array";
import * as F from "fp-ts/function";
import * as O from "fp-ts/Ord";
import * as N from "fp-ts/number";
import { Dirent } from "fs";
import { readdir } from "fs/promises";
import { isNotJunk } from "junk";
import { deleteMdFileExtension as trim } from "modules/utils/file";
import { GetStaticPathsResult } from "next";
import { resolve } from "path";
import { noteMeta } from "./meta";

const readDir = (path: string) => readdir(resolve(path), { withFileTypes: true });

type Note = {
  [key: string]: string | Note;
};

const filterJunk = (d: Dirent) => isNotJunk(d.name);
const sortFolder = F.pipe(
  N.Ord,
  O.contramap((d: Dirent) => -d.isDirectory()),
);

export async function noteFiles(path: string): Promise<Note> {
  const _dir = await readDir(path);
  const dir = F.pipe(_dir, A.filter(filterJunk), A.sort(sortFolder));

  const format = async (d: Dirent) =>
    d.isDirectory()
      ? { [d.name]: await noteFiles(`${path}/${d.name}`) }
      : { [trim(d.name)]: (await noteMeta(path, d.name)).title };
  return F.pipe(
    await Promise.all(F.pipe(dir, A.map(format))),
    A.reduce({}, (acc, cur) => ({ ...acc, ...cur })),
  );
}

export async function noteStaticPaths(): Promise<GetStaticPathsResult["paths"]> {
  const files = await noteFiles("notes");

  function generatePaths(dirs: Note, path: string[] = []): string[][] {
    const keys = Object.keys(dirs);
    const rawDirs = keys.map((key) =>
      typeof dirs[key] === "string" ? [...path, key] : generatePaths(dirs[key] as Note, [...path, key] as string[]),
    );
    return rawDirs.reduce(
      (acc, cur) => (Array.isArray(cur[0]) ? [...acc, ...cur] : [...acc, cur]) as string[][],
      [],
    ) as string[][];
  }

  return generatePaths(files).map((f) => ({
    params: {
      slug: f,
    },
  }));
}
