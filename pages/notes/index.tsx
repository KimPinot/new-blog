import { noteFiles } from "modules/note/list";
import type { GetStaticProps, NextPage } from "next";
import { NoteLayout } from "components/layout/NoteLayout";

type Props = {
  notes: Note;
};

type Note = {
  [key: string]: "file" | Note;
};

const Notes: NextPage<Props> = ({ notes }) => {
  return (
    <NoteLayout notes={notes} title={"토막글 모음집"} description={""} date={+new Date(2022, 8, 9, 0, 54, 32)}>
      <p>대충 저장은 하고 싶은데 글로 쓰기 아까운 내용들을 다룹니다.</p>
    </NoteLayout>
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
