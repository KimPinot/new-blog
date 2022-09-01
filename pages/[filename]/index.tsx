import { getPostsStaticParams } from "modules/post/list";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getContent, getMetadata } from "modules/post/article";
import { RenderMDX } from "components/RenderMDX";
import { ArticleLayout } from "components/layout/ArticleLayout";
import { Comments } from "components/commnets";

type Props = {
  filename: string;
  meta: Record<string, any>;
  code: string;
};

const ArticleDetail: NextPage<Props> = ({ filename, meta, code }) => {
  return (
    <>
      <ArticleLayout
        id={filename}
        title={meta.title}
        description={meta.description}
        date={meta.date}
        layout={meta.layout}
      >
        <RenderMDX code={code} />
        <Comments />
      </ArticleLayout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: await getPostsStaticParams(),
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
