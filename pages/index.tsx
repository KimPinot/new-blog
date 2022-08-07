import { getPostsMeta } from "modules/post/list";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";

type Props = {
  articles: {
    filename: string;
    title: string;
  }[];
};

const Home: NextPage<Props> = ({ articles }) => {
  console.log(articles);
  return (
    <div className="p-5">
      <h1>Hello NextJS!</h1>
      <ul>
        {articles.map((item) => (
          <li key={item.filename}>
            <Link href={`/${item.filename}`}>
              <a className="link link-primary">{item.title}</a>
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
