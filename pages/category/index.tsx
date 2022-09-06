import { MetaDataWithFilename } from "modules/post/article";
import { getCategories } from "modules/post/list";
import { NextPage } from "next";
import Link from "next/link";

type Props = {
  categories: {
    [key: string]: MetaDataWithFilename[];
  };
};

const Categories: NextPage<Props> = ({ categories }) => {
  return (
    <main className="page-content">
      <header>
        <h1 className="text-2xl font-bold">Categories</h1>
      </header>
      <article>
        <ul className="pl-5 list-disc">
          {Object.keys(categories).map((category) => (
            <li className="mt-2" key={category}>
              <h2 className="text-xl font-bold">{category}</h2>
              <ul className="pl-5">
                {categories[category].map((article) => (
                  <li key={article.filename}>
                    <Link href={`/${article.filename}`}>
                      <a className="link link-hover link-primary underline-offset-4">{article.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </article>
    </main>
  );
};

export async function getStaticProps() {
  const categories = await getCategories();

  return {
    props: {
      categories,
    },
  };
}

export default Categories;
