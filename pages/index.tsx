import { format } from "date-fns";
import { getPostsMeta } from "modules/post/list";
import { dateWithoutTimezone } from "modules/utils/date";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";

type Props = {
  articles: {
    filename: string;
    title: string;
    date: Date;
  }[];
};

const Home: NextPage<Props> = ({ articles }) => {
  console.log(articles);
  return (
    <div className="p-5 container mx-auto">
      <ul className="flex flex-col gap-1">
        {articles.map((item) => (
          <li key={item.filename} className="flex gap-8" title={item.title}>
            <span className="text-lg">{format(dateWithoutTimezone(item.date), "yyyy-MM-dd")}</span>
            <Link href={`/${item.filename}`}>
              <a className="text-xl hover:text-primary transition-colors">{item.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      articles: await getPostsMeta(),
    },
  };
};

export default Home;
