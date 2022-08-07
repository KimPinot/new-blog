import * as F from "fp-ts/function";
import * as A from "fp-ts/Array";
import { deleteMdFileExtension, readDir } from "modules/post";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";

type Props = {
  articles: string[];
};

const Home: NextPage<Props> = ({ articles }) => {
  return (
    <div className="p-5">
      <h1>Hello NextJS!</h1>
      <ul>
        {articles.map((item) => (
          <li key={item}>
            <Link href={`/${item}`}>
              <a className="link link-primary">{item}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const dirs = await readDir("./posts");
  return {
    props: {
      articles: F.pipe(dirs, A.map(deleteMdFileExtension)),
    },
  };
};

export default Home;
