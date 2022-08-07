import { getPostsStaticParms } from "modules/post/list";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { evaluate } from "@mdx-js/mdx";
import { getArticle } from "modules/post/article";

type Props = {
  filename: string;
  meta: Record<string, any>;
  content: string;
};

const ArticleDetail: NextPage<Props> = ({ filename, content }) => {
  return (
    <main>
      <h1 className="text-xl">article: {filename}</h1>
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
  const { meta, content } = await getArticle(String(params?.filename));
  return {
    props: {
      filename: params?.filename,
      meta,
      content,
    },
  };
};

export default ArticleDetail;
