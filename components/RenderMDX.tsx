import SyntaxHighlighter from "react-syntax-highlighter";
import theme from "react-syntax-highlighter/dist/cjs/styles/hljs/github";
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
  p: ({ children }) => <p className="markdown-p leading-1 mb-2">{children}</p>,
  h1: ({ children }) => <h1 className="markdown-h1 text-4xl font-bold mb-2">{children}</h1>,
  h2: ({ children }) => <h1 className="markdown-h2 text-3xl font-bold mb-2">{children}</h1>,
  h3: ({ children }) => <h1 className="markdown-h3 text-2xl font-bold mb-2">{children}</h1>,
  h4: ({ children }) => <h1 className="markdown-h4 text-xl font-bold mb-2">{children}</h1>,
  ul: ({ children }) => <ul className="markdown-ul list-disc mb-2 pl-5">{children}</ul>,
  // eslint-disable-next-line @next/next/no-img-element
  img: ({ src, alt, ...props }) => <img className="card mb-2" src={src} alt={alt} {...props} />,
  pre: ({ filename, children, ...props }) => (
    <pre className="font-monospace" {...props}>
      {children}
    </pre>
  ),
  code: ({ className, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    return match ? (
      <SyntaxHighlighter language={match[1]} PreTag="code" style={theme} {...props} />
    ) : (
      <code className={className} {...props} />
    );
  },
};

export function RenderMDX({ code }: Props) {
  const Render = useMemo(() => getMDXComponent(code), [code]);
  return <Render components={components as ComponentMap} />;
}
