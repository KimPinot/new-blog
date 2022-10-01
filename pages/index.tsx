import { format } from "date-fns";
import { MetaDataWithFilename } from "modules/post/article";
import { getSortedPosts } from "modules/post/list";
import { dateWithoutTimezone } from "modules/utils/date";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";

type Props = {
  articles: MetaDataWithFilename[];
};

const Home: NextPage<Props> = ({ articles }) => {
  return (
    <div className="page-content">
      {articles.map((item) => (
        <div key={item.filename} className="flex flex-col py-4 gap-y-1" title={item.title}>
          <Link href={`/${item.filename}`}>
            <a className="flex-1 text-2xl hover:text-primary transition-colors font-bold">{item.title}</a>
          </Link>
          <p className="text-base text-slate-700">{item.description}</p>
          <span className="font-[inherit] text-base text-slate-500">
            {format(dateWithoutTimezone(item.date), "yyyy-MM-dd")}
          </span>
        </div>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      articles: await getSortedPosts(),
    },
  };
};

export default Home;
