import { getPostsStaticParms } from "modules/post/list";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getContent, getMetadata } from "modules/post/article";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { format } from "date-fns";
import { dateWithoutTimezone } from "modules/utils/date";

type Props = {
  filename: string;
  meta: Record<string, any>;
  code: string;
};

  const Component = useMemo(() => getMDXComponent(code), [code]);
const ArticleDetail: NextPage<Props> = ({ filename, meta, code }) => {

  return (
    <main>
      <h1 className="text-xl">article: {filename}</h1>
      <Component />
      <h1 className="text-xl">date: {format(dateWithoutTimezone(meta.date), "yyyy-MM-dd hh:mm:ss")}</h1>
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
