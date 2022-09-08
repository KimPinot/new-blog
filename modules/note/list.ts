import * as A from "fp-ts/Array";
import * as F from "fp-ts/function";
import { Dirent } from "fs";
import { readdir } from "fs/promises";
import { deleteMdFileExtension as trim } from "modules/utils/file";
import { resolve } from "path";

const readDir = (path: string) => readdir(resolve(path), { withFileTypes: true });

export async function noteFiles(path: string): Promise<any> {
  const dir = await readDir(path);
  const format = async (d: Dirent) =>
    d.isDirectory() ? { [d.name]: await noteFiles(`${path}/${d.name}`) } : { [trim(d.name)]: "file" };
  return !dir.find((i) => i.isDirectory())
    ? F.pipe(
        dir,
        A.reduce({}, (acc, cur) => ({ ...acc, [trim(cur.name)]: "file" })),
      )
    : F.pipe(
        await Promise.all(F.pipe(dir, A.map(format))),
        A.reduce({}, (acc, cur) => ({ ...acc, ...cur })),
      );
}
