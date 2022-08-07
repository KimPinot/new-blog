import { getPostsStaticParms } from "modules/post/list";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

type Props = {
  filename: string;
};

const ArticleDetail: NextPage<Props> = ({ filename }) => {
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
  console.log(params);
  return {
    props: {
      filename: params?.filename,
    },
  };
};

export default ArticleDetail;
