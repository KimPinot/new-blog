import * as A from "fp-ts/Array";
import * as F from "fp-ts/function";
import { Dirent } from "fs";
import { readdir } from "fs/promises";
import { deleteMdFileExtension as trim } from "modules/utils/file";
import { GetStaticPathsResult } from "next";
import { resolve } from "path";
import { noteMeta } from "./meta";

const readDir = (path: string) => readdir(resolve(path), { withFileTypes: true });

type Note = {
  [key: string]: string | Note;
};

export async function noteFiles(path: string): Promise<Note> {
  const dir = await readDir(path);
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

  function generaatePaths(dirs: Note, path: string[] = []): string[][] {
    const keys = Object.keys(dirs);
    const rawDirs = keys.map((key) =>
      typeof dirs[key] === "string" ? [...path, key] : generaatePaths(dirs[key] as Note, [...path, key] as string[]),
    );
    return rawDirs.reduce(
      (acc, cur) => (Array.isArray(cur[0]) ? [...acc, ...cur] : [...acc, cur]) as string[][],
      [],
    ) as string[][];
  }

  return generaatePaths(files).map((f) => ({
    params: {
      slug: f,
    },
  }));
}
