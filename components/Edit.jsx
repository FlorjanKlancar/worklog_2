import React from "react";
import {Dialog} from "@headlessui/react";
import {PencilAltIcon} from "@heroicons/react/solid";
import moment from "moment";
import {useState} from "react";
import {db} from "./firebase/index";
import {doc, updateDoc} from "firebase/firestore";

function Edit({editItem, setEditOpenModal}) {
  console.log("editItem", editItem);

  const [wage, setWage] = useState(editItem.data.wage);
  const [hours, setHours] = useState(editItem.data.hours);
  const [minutes, setMinutes] = useState(editItem.data.minutes);

  async function submitHandler() {
    const saveObject = {
      wage,
      hours,
      minutes,
    };

    const hoursDoc = doc(db, "hours", editItem.id);

    await updateDoc(hoursDoc, saveObject);
    setEditOpenModal(false);
  }

  return (
    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
            <PencilAltIcon
              className="h-6 w-6 text-green-600"
              aria-hidden="true"
            />
          </div>
          <div className="text-center sm:text-left">
            <Dialog.Title
              as="h3"
              className="text-lg leading-6 font-medium text-gray-900"
            >
              Edit values
            </Dialog.Title>
          </div>

          <div>
            <div className="flex flex-col place-items-center space-y-2 mt-8 px-8 ">
              <label className="text-left w-full text-sm font-semibold">
                Date
              </label>
              <input
                type="text"
                disabled
                className="border-1 border-opacity-25 border-gray-400 rounded w-full px-3 py-2 focus focus:border-blue-600 focus:outline-none active:outline-none active:border-blue-600 focus:placeholder-blue-600"
                value={moment(editItem.data.date).format("DD. MM. YYYY")}
              />

              <label className="text-left w-full text-sm font-semibold">
                Hours
              </label>
              <input
                type="number"
                className="border-1 border-opacity-25 border-gray-400 rounded w-full px-3 py-2 focus focus:border-blue-600 focus:outline-none active:outline-none active:border-blue-600 focus:placeholder-blue-600"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                required
              />

              <label className="text-left w-full text-sm font-semibold">
                Minutes
              </label>
              <input
                type="number"
                className="border-1 border-opacity-25 border-gray-400 rounded w-full px-3 py-2 focus focus:border-blue-600 focus:outline-none active:outline-none active:border-blue-600 focus:placeholder-blue-600"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                required
              />

              <label className="text-left w-full text-sm font-semibold">
                Wage
              </label>
              <input
                type="number"
                placeholder={"Enter wage"}
                className="border-1 border-opacity-25 border-gray-400 rounded w-full px-3 py-2 focus focus:border-blue-600 focus:outline-none active:outline-none active:border-blue-600 focus:placeholder-blue-600"
                value={wage}
                onChange={(e) => setWage(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 flex">
        <button
          type="button"
          className="mr-1 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => setEditOpenModal(false)}
        >
          Cancel
        </button>
        <button
          type="button"
          className="ml-1 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={submitHandler}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Edit;
