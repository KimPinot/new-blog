import { noteFiles, noteStaticPaths } from "modules/note/list";
import { FaCaretRight } from "react-icons/fa";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { note } from "modules/note/item";
import { deleteMdFileExtension } from "modules/utils/file";

type Props = {
  notes: Note;
  note: string;
};

type Note = {
  [key: string]: "file" | Note;
};

type ListsProps = {
  notes: Note;
  path?: string;
};

function Lists({ notes, path = "" }: ListsProps) {
  const _notes = Object.keys(notes);
  return (
    <div className="flex flex-col gap-1">
      {_notes.map((note) =>
        typeof notes[note] === "object" ? (
          <div key={note}>
            <details>
              <summary className="btn btn-ghost w-full justify-start normal-case">
                <FaCaretRight /> {note}
              </summary>
              <div className="pl-4 py-1">
                <Lists notes={notes[note] as Note} path={`${path}/${note}`} />
              </div>
            </details>
          </div>
        ) : (
          <div key={note}>
            <Link href={`/notes${path}/${note}`}>
              <a className="btn btn-ghost w-full justify-start normal-case">{note}</a>
            </Link>
          </div>
        ),
      )}
    </div>
  );
}

const Notes: NextPage<Props> = ({ notes, note }) => {
  return (
    <div className="page-content mx-auto flex py-0">
      <nav className="min-w-[250px] min-h-[calc(100vh-80px)] border-r-2 h-full overflow-y-auto py-8 px-2">
        <Lists notes={notes} />
      </nav>
      <article className="p-8 flex flex-col gap-2">{JSON.stringify(note)}</article>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: await noteStaticPaths(),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = (params!.slug as string[]) || [];
  const paths = slug.slice(0, -1).join("/");
  const filename = deleteMdFileExtension(slug.slice(-1)[0]);
  console.log(slug, paths, filename)

  return {
    props: {
      notes: await noteFiles("notes"),
      note: await note(paths, filename),
    },
  };
};

export default Notes;
