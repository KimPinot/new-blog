import matter from "gray-matter";
import { readFile } from "modules/utils/file";

export const note = (dir = "", filename: string) => {
  try {
    return readFile(`notes/${dir}`)(filename)("md");
  } catch (e) {
    readFile(`notes/${dir}`)(filename)("mdx");
  }
};

export const noteContent = async (dir = "", filename: string) => {
  return matter(await note(dir, filename)!).content;
};
