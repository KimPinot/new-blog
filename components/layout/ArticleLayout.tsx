import classcat from "classcat";
import { format } from "date-fns";
import { dateWithoutTimezone } from "modules/utils/date";
import Head from "next/head";
import { HTMLProps, ReactNode } from "react";
import { BiTime } from "react-icons/bi";

interface Props extends HTMLProps<HTMLDivElement> {
  title: string;
  description: string;
  thumbnail?: string;
  date: number;
  layout?: string;
  children: ReactNode;
}

export function ArticleLayout({ title, description, thumbnail, date, children, layout, ...props }: Props) {
  return (
    <main {...props}>
      <Head>
        <title>{`nabi.kim | ${title}`}</title>
        <meta property="og:title" content={`nabi.kim | ${title}`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={thumbnail ?? "/assets/opengraph.png"} />
      </Head>
      <header>
        <div className="page-content">
          <h1 className="text-2xl font-bold">{title}</h1>
          <h3 className="text-lg flex gap-2 items-center">
            <BiTime /> {format(dateWithoutTimezone(date), "yyyy-MM-dd hh:mm:ss")}
          </h3>
        </div>
      </header>
      <article className={classcat(["makrdown-content", layout && `layout-${layout}`])}>
        <div className="page-content pt-0 pb-36 flex flex-col gap-2">{children}</div>
      </article>
    </main>
  );
}
