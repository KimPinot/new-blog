import * as F from "fp-ts/function";
import * as S from "fp-ts/string";
import { readFile as fsReadFile } from "fs/promises";
import { join, resolve } from "path";

export const readFile = (dir: string) => (filename: string) => (extension: string) =>
  fsReadFile(join(resolve(dir), `${filename}.${extension}`), "utf-8");

export const deleteMdFileExtension = (filename: string) => F.pipe(filename, S.replace(/.md(x)?/g, ""));
