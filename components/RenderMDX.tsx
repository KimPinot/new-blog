import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";

type Props = {
  code: string;
};

const components: import("mdx/types").MDXComponents = {};

export function RenderMDX({ code }: Props) {
  const Render = useMemo(() => getMDXComponent(code), [code]);
  return <Render components={components} />;
}
