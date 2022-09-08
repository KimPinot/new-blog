import { noteFiles } from "modules/note/list";
import { FaCaretRight } from "react-icons/fa";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";

type Props = {
  notes: Note;
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

const Notes: NextPage<Props> = ({ notes }) => {
  return (
    <div className="page-content mx-auto flex py-0">
      <nav className="min-w-[250px] min-h-[calc(100vh-80px)] border-r-2 h-full overflow-y-auto py-8 px-2">
        <Lists notes={notes} />
      </nav>
      <article className="p-8 flex flex-col gap-2">
        <h1 className="text-2xl font-bold">토막글 모음집</h1>
        <p>정보를 저장하고 싶은데 블로그에다가 적기 애매한 토막글을 씁니다.</p>
        <p>
          <a className="link link-primary link-hover" href="https://miryang.dev">
            이 블로그
          </a>
          에서 영감을 얻었습니다.
        </p>
      </article>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      notes: await noteFiles("notes"),
    },
  };
};

export default Notes;
