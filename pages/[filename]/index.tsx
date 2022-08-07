import { getPostsStaticParms } from "modules/post/list";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getContent, getMetadata } from "modules/post/article";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { format } from "date-fns";
import { dateWithoutTimezone } from "modules/utils/date";
import { BiTime } from "react-icons/bi";
import { RenderMDX } from "components/RenderMDX";

type Props = {
  filename: string;
  meta: Record<string, any>;
  code: string;
};

const ArticleDetail: NextPage<Props> = ({ filename, meta, code }) => {
  return (
    <div>
      <header>
        <div className="container mx-auto p-5">
          <h1 className="text-2xl font-bold">{meta.title}</h1>
          <h3 className="text-lg flex gap-2 items-center">
            <BiTime /> {format(dateWithoutTimezone(meta.date), "yyyy-MM-dd hh:mm:ss")}
          </h3>
        </div>
      </header>
      <article>
        <div className="container mx-auto p-5 pt-0">
          <RenderMDX code={code} />
        </div>
      </article>
    </div>
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
