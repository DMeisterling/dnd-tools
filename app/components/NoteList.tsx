import { INote } from "@/types/notes";
import Note from "./Note";

interface NoteListProps {
  notes: INote[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>Notes</th>
            <th>date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <Note note={note} key={note.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NoteList;
