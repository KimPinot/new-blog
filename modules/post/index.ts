import * as F from "fp-ts/function";
import * as A from "fp-ts/Array";
import * as S from "fp-ts/string";
import * as Task from "fp-ts/lib/Task";
import { readdir } from "fs/promises";
import path from "path";

const readDirWithoutFiletypes = (path: string) => readdir(path, { withFileTypes: false });

export const deleteMdFileExtension = (filename: string) => F.pipe(filename, S.replace(".md", ""));

const staticPathObj = (filename: string) => ({
  params: {
    filename,
  },
});

const staticPath = (filename: string) => F.pipe(filename, deleteMdFileExtension, staticPathObj);

export const readDir = (targetDir: string) => F.pipe(targetDir, path.resolve, readDirWithoutFiletypes);

export const dirToStaticPath = (files: string[]) => F.pipe(files, A.map(staticPath));
