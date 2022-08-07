import * as F from "fp-ts/function";
import { compile } from "@mdx-js/mdx";

const mdx = (markdown: string) => compile(markdown, {});
export const compileMdx = async (markdown: string) => F.pipe(markdown, await mdx);
