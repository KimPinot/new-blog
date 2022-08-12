import { HTMLProps } from "react";
import cc from "classcat";
import theme from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-light";
import SyntaxHighlighter, { SyntaxHighlighterProps } from "react-syntax-highlighter";

type Props = HTMLProps<HTMLHeadingElement>;

export function H1({ children, className }: Props) {
  return <h1 className={cc(["markdown-h1 mt-4 text-2xl font-bold", className])}>{children}</h1>;
}

export function H2({ children, className }: Props) {
  return <h2 className={cc(["markdown-h2 mt-4 text-xl font-bold", className])}>{children}</h2>;
}

export function H3({ children, className }: Props) {
  return <h3 className={cc(["markdown-h3 mt-4 text-lg font-bold", className])}>{children}</h3>;
}

export function H4({ children, className }: Props) {
  return <h4 className={cc(["markdown-h4 mt-4 text-base font-bold", className])}>{children}</h4>;
}

export function P({ children, className }: Props) {
  return <p className={cc(["markdown-p leading-1", className])}>{children}</p>;
}

export function Code({ className, ...props }: SyntaxHighlighterProps) {
  const match = /language-(\w+)/.exec(className || "");
  return match ? (
    <SyntaxHighlighter
      PreTag="div"
      style={theme}
      language={match[1]}
      customStyle={{ padding: "1.5rem", marginBottom: "0.5rem", marginTop: "0.5rem" }}
      {...props}
    />
  ) : (
    <code
      className={cc(["py-[1px] px-[4px] rounded-md bg-slate-100 text-[14px] text-stale-600", className])}
      {...props}
    />
  );
}
