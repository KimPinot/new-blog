import { Lists } from "components/note/list";
import { Note } from "modules/note/type";
import { ReactNode } from "react";
import { ArticleLayout, ArticleLayoutProps } from "./ArticleLayout";

export type NoteLayoutProps = {
  notes: Note;
  metadata: ArticleLayoutProps;
  children: ReactNode;
};

export function NoteLayout({ notes, metadata, ...props }: NoteLayoutProps) {
  return (
    <main className="max-w-5xl mx-auto flex py-0">
      <nav className="hidden md:block min-w-[250px] min-h-[calc(100vh-80px)] border-r-2 h-full overflow-y-auto py-8 px-2">
        <Lists notes={notes} />
      </nav>
      <ArticleLayout className="md:w-[calc(64rem-250px)] w-full" {...metadata} {...props} layout="note" />
    </main>
  );
}
