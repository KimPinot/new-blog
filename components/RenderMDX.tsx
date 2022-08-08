import SyntaxHighlighter from "react-syntax-highlighter";
import theme from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-light";
import { ComponentMap, getMDXComponent } from "mdx-bundler/client";
import { ComponentProps, HTMLProps, useMemo } from "react";

type Props = {
  code: string;
};

interface MarkedPre extends HTMLProps<HTMLPreElement> {
  filename: string;
}

interface MarkedCode extends ComponentProps<typeof SyntaxHighlighter> {
  class: string;
}

interface IComponents extends Omit<Partial<ComponentMap>, "pre" | "code"> {
  pre: (props: MarkedPre) => JSX.Element;
  code: (props: MarkedCode) => JSX.Element;
}

const components: IComponents = {
  h1: ({ children }) => <h1 className="markdown-h1 mt-4 text-3xl font-bold">{children}</h1>,
  h2: ({ children }) => <h1 className="markdown-h2 mt-4 text-2xl font-bold">{children}</h1>,
  h3: ({ children }) => <h1 className="markdown-h3 mt-4 text-xl font-bold">{children}</h1>,
  h4: ({ children }) => <h1 className="markdown-h4 mt-4 text-lg font-bold">{children}</h1>,
  p: ({ children }) => <p className="markdown-p leading-1">{children}</p>,
  ul: ({ children }) => <ul className="markdown-ul list-disc pl-5">{children}</ul>,
  // eslint-disable-next-line @next/next/no-img-element
  img: ({ src, alt, ...props }) => <img className="card" src={src} alt={alt} {...props} />,
  a: (props) => <a {...props} className="link link-hover link-primary underline-offset-4" />,
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
  code: ({ className, ...props }) => {
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
