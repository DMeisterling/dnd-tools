import { getAllNotes } from "@/api";
import Image from "next/image";
import dndIcon from "./assets/images/dnd.1024x942.png";
import AddNote from "./components/AddNote";
import NoteList from "./components/NoteList";

export default async function Home() {
  const notes = await getAllNotes();
  console.log(notes);
  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <Image
          src={dndIcon}
          alt=""
          width={50}
          height={50}
          className="mx-auto"
        />
        <h1 className="text-2xl font-bold">DnD notes app</h1>
        <AddNote />
      </div>
      <NoteList notes={notes} />
    </main>
  );
}
