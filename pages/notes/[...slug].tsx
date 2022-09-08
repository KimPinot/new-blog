import { noteFiles, noteStaticPaths } from "modules/note/list";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { noteContent } from "modules/note/item";
import { deleteMdFileExtension } from "modules/utils/file";
import { NoteLayout } from "components/layout/NoteLayout";
import { Note } from "modules/note/type";
import { Comments } from "components/commnets";
import { noteMeta } from "modules/note/meta";
import { _unified } from "modules/post/article";

type Props = {
  notes: Note;
  __html: string;
  metadata: Record<string, never>;
};

const Notes: NextPage<Props> = ({ notes, __html, metadata }) => {
  return (
    <NoteLayout notes={notes} metadata={metadata as any}>
      <div className="flex flex-col gap-2" dangerouslySetInnerHTML={{ __html }} />
    </NoteLayout>
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
  const filename = deleteMdFileExtension(slug.slice(-1)[0] || "index.md");

  return {
    props: {
      notes: await noteFiles("notes"),
      metadata: await noteMeta(paths, filename),
      __html: (await _unified(await noteContent(paths, filename)!)).value,
    },
  };
};

export default Notes;
