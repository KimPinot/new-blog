import { getPostsStaticParams } from "modules/post/list";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { readPost } from "modules/post/article";
import { ArticleLayout } from "components/layout/ArticleLayout";
import { Comments } from "components/commnets";

type Props = {
  filename: string;
  __html: string;
  metadata: Record<string, never>;
};

const ArticleDetail: NextPage<Props> = ({ filename, metadata, __html }) => {
  return (
    <>
      <ArticleLayout
        id={filename}
        title={metadata.title}
        description={metadata.description}
        date={metadata.date}
        layout={metadata.layout}
      >
        <div className="flex flex-col gap-2" dangerouslySetInnerHTML={{ __html }} />
        {metadata.comment !== false && <Comments />}
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
  const post = await readPost(filename);

  return {
    props: {
      filename,
      ...post,
    },
  };
};

export default ArticleDetail;
