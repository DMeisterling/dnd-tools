"use client";

import { deleteNote, editNote } from "@/api";
import { INote } from "@/types/notes";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import Modal from "./Modal";

interface NoteProps {
  note: INote;
}

const Note: React.FC<NoteProps> = ({ note }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [noteToEdit, setNoteToEdit] = useState<string>(note.text);
  const [newDate, setNewDate] = useState(new Date());
  const nowDate = new Date();
  const curDate = new Date(note.date);
  const dateString = `${curDate.getDate()}.${
    curDate.getMonth() + 1
  }.${curDate.getFullYear()}`;

  const handleSubmitEditNote: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editNote({
      id: note.id,
      text: noteToEdit,
      date: newDate,
    });
    setNewDate(nowDate);
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteNote = async (id: string) => {
    await deleteNote(id);
    setOpenModalDeleted(false);
    router.refresh();
  };

  return (
    <tr key={note.id}>
      <td className="w-full">{note.text}</td>
      <td>{dateString}</td>
      <td className="flex gap-5">
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-blue-500"
          size={25}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditNote}>
            <h3 className="font-bold text-lg">Edit Note</h3>
            <DatePicker
              selected={newDate}
              onChange={(date: Date) => setNewDate(date)}
            />
            <div className="modal-action">
              <input
                value={noteToEdit}
                onChange={(e) => setNoteToEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <BsTrash
          onClick={() => setOpenModalDeleted(true)}
          cursor="pointer"
          className="text-red-500"
          size={25}
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3>Are you sure you want to delete this note?</h3>
          <div className="modal-action">
            <button onClick={() => handleDeleteNote(note.id)} className="btn">
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Note;
