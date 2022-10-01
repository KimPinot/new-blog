import { Lists } from "components/note/list";
import { format } from "date-fns";
import { Note } from "modules/note/type";
import { dateWithoutTimezone } from "modules/utils/date";
import Head from "next/head";
import { ReactNode } from "react";
import { BiTime } from "react-icons/bi";

export type NoteLayoutProps = {
  notes: Note;
  metadata: Record<string, never>;
  children: ReactNode;
};

export function NoteLayout({ notes, metadata, children }: NoteLayoutProps) {
  return (
    <main className="max-w-5xl mx-auto flex py-0 h-[calc(100vh-80px)]">
      <Head>
        <title>{`nabi.kim | ${metadata.title}`}</title>
        <meta name="description" content={metadata.description ?? "평범한 기술 블로그"} />
        <meta property="og:title" content={`nabi.kim | ${metadata.title}`} />
        <meta property="og:description" content={metadata.description ?? "평범한 기술 블로그"} />
        <meta property="og:image" content={metadata.thumbnail ?? "https://nabi.kim/assets/opengraph.png"} />
      </Head>
      <nav className="hidden md:block w-[250px] border-r-2 overflow-y-auto py-8 px-2">
        <Lists notes={notes} />
      </nav>
      <div className="overflow-y-auto w-full">
        <header>
          <div className="page-content">
            <h1 className="text-2xl font-bold">{metadata.title}</h1>
            <h3 className="text-lg flex gap-2 items-center">
              <BiTime /> {format(dateWithoutTimezone(metadata.date), "yyyy-MM-dd hh:mm:ss")}
            </h3>
          </div>
        </header>
        <article className={"markdown-content w-full"}>
          <div className="page-content pt-0 pb-36">{children}</div>
        </article>
      </div>
    </main>
  );
}
