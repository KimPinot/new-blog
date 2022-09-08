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
    <main className="page-content mx-auto flex py-0">
      <nav className="min-w-[250px] min-h-[calc(100vh-80px)] border-r-2 h-full overflow-y-auto py-8 px-2">
        <Lists notes={notes} />
      </nav>
      <ArticleLayout className="w-full" {...metadata} {...props} layout="note" />
    </main>
  );
}
