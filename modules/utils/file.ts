import { readFile as fsReadFile } from "fs/promises";
import { join, resolve } from "path";

export const readFile = (dir: string) => (filename: string) => (extension: string) =>
  fsReadFile(join(resolve(dir), `${filename}.${extension}`), "utf-8");
