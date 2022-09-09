import Link from "next/link";
import { Note } from "modules/note/type";

type ListsProps = {
  notes: Note;
  path?: string;
};

export function Lists({ notes, path = "" }: ListsProps) {
  const _notes = Object.keys(notes);
  return (
    <div className="flex flex-col gap-1">
      {_notes.map((note) =>
        typeof notes[note] === "object" ? (
          <div key={note}>
            <details>
              <summary className="btn btn-ghost list-item leading-[3rem] text-left normal-case">
                <span className="inline-block ml-2">{note}</span>
              </summary>
              <div className="pl-4 py-1">
                <Lists notes={notes[note] as Note} path={`${path}/${note}`} />
              </div>
            </details>
          </div>
        ) : (
          <div key={note}>
            <Link href={`/notes${path}/${note}`}>
              <a className="btn btn-ghost w-full justify-start normal-case">{notes[note]}</a>
            </Link>
          </div>
        ),
      )}
    </div>
  );
}
