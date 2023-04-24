"use client";

import { addNote } from "@/api";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import DatePicker from "react-datepicker";
import { AiOutlinePlus } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import Modal from "./Modal";

const AddNote = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newNoteValue, setNewNoteValue] = useState<string>("");
  const [newDate, setNewDate] = useState(new Date());
  const nowDate = new Date();

  const handleSubmitNewNote: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addNote({
      id: uuidv4(),
      text: newNoteValue,
      date: newDate,
    });
    setNewNoteValue("");
    setNewDate(nowDate);
    setModalOpen(false);
    router.refresh();
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full"
      >
        Add new Note <AiOutlinePlus className="ml-2" size={18} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewNote}>
          <h3 className="font-bold text-lg">Add new note</h3>
          <DatePicker
            selected={newDate}
            onChange={(date: Date) => setNewDate(date)}
          />
          <div className="modal-action">
            <input
              value={newNoteValue}
              onChange={(e) => setNewNoteValue(e.target.value)}
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
    </div>
  );
};

export default AddNote;
