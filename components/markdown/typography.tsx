import { HTMLProps } from "react";

type Props = HTMLProps<HTMLHeadingElement>;

export function H1({ children }: Props) {
  return <h1 className="markdown-h1 mt-4 text-2xl font-bold">{children}</h1>;
}

export function H2({ children }: Props) {
  return <h2 className="markdown-h2 mt-4 text-xl font-bold">{children}</h2>;
}

export function H3({ children }: Props) {
  return <h3 className="markdown-h3 mt-4 text-lg font-bold">{children}</h3>;
}

export function H4({ children }: Props) {
  return <h4 className="markdown-h4 mt-4 text-base font-bold">{children}</h4>;
}

export function P({ children }: Props) {
  return <p className="markdown-p leading-1">{children}</p>;
}
