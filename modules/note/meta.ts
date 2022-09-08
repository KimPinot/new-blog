import matter from "gray-matter";
import { deleteMdFileExtension } from "modules/utils/file";
import { note } from "./item";

export async function noteMeta(dir = "", filename: string) {
    const file = await note(dir.split("/").slice(1).join("/"), deleteMdFileExtension(filename));
    return matter(file!).data;
}