import { getPostsStaticParms } from "modules/post/list";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getContent, getMetadata } from "modules/post/article";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";

type Props = {
  filename: string;
  frontMatter: Record<string, any>;
  code: string;
};

const ArticleDetail: NextPage<Props> = ({ filename, code }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <main>
      <h1 className="text-xl">article: {filename}</h1>
      <Component />
    </main>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: await getPostsStaticParms(),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const filename = params?.filename as string;

  return {
    props: {
      filename,
      code: await getContent(filename),
      meta: await getMetadata(filename),
    },
  };
};

export default ArticleDetail;
