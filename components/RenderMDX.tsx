import SyntaxHighlighter, { SyntaxHighlighterProps } from "react-syntax-highlighter";
import theme from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-light";
import { ComponentMap, getMDXComponent } from "mdx-bundler/client";
import { FC, useMemo } from "react";

type Props = {
  code: string;
};

type ComponentsType = {
  [key: string]: FC<any>;
};

export const components: ComponentsType = {
  h1: (props) => <h1 className={"markdown-h1 mt-4 text-2xl font-bold"} {...props} />,
  h2: (props) => <h1 className={"markdown-h2 mt-4 text-xl font-bold"} {...props} />,
  h3: (props) => <h1 className={"markdown-h3 mt-4 text-lg font-bold"} {...props} />,
  h4: (props) => <h1 className={"markdown-h4 mt-4 text-base font-bold"} {...props} />,
  p: (props) => <p className={"markdown-p leading-1"} {...props} />,
  ul: (props) => <ul className="markdown-ul list-disc pl-5" {...props} />,
  ol: ({ children }) => <ul className="markdown-ul list-decimal pl-5">{children}</ul>,
  table: ({ children }) => (
    <div className="overflow-x-auto">
      <table className="table markdown-table">{children}</table>
    </div>
  ),
  // eslint-disable-next-line @next/next/no-img-element
  img: ({ src, alt, ...props }) => <img className="card" src={src} alt={alt} {...props} />,
  a: ({ href, children, ...props }) => (
    <a {...props} href={href} className="link link-hover link-primary underline-offset-4">
      {children}
      <span className="hidden print:block">({href})</span>
    </a>
  ),
  input: ({ type, ...props }) => {
    switch (type) {
      case "checkbox":
        return <input type="checkbox" className={"inline-block checkbox checkbox-sm -mb-1"} {...props} />;
      default:
        return <input type={type} {...props} />;
    }
  },
  pre: ({ filename, children, ...props }) => (
    <pre className="font-monospace" {...props}>
      {children}
    </pre>
  ),
  code: ({ className, ...props }: SyntaxHighlighterProps) => {
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
      <code className={"py-[1px] px-[4px] rounded-md bg-slate-100 text-[14px] text-stale-600"} {...props} />
    );
  },
};

export function RenderMDX({ code }: Props) {
  const Render = useMemo(() => getMDXComponent(code), [code]);
  return <Render components={components as ComponentMap} />;
}
