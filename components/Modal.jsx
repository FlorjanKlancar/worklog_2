import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function Modal({ modal, openModal }) {
  const [username, setUsername] = useState("Manja");
  const [wage, setWage] = useState(7.2);
  const [hours, setHours] = useState(8);

  function submitHandler() {
    const submitObj = {
      username,
      wage,
      hours,
    };
    console.log("submit", submitObj);

    openModal(false);
  }

  return (
    <Transition.Root show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto "
        onClose={openModal}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center ">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className=" text-sm p-3 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full divide-y-2 divider-black divider-opacity-60">
              <div className="pb-2 text-lg text-center text-black font-bold">
                User info
              </div>

              <div className="py-2 flex justify-between">
                <div className="w-full">Change default username</div>
                <div className="w-1/3 ">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border-2  rounded text-center w-full"
                  />
                </div>
              </div>

              <div className="py-2 flex justify-between">
                <div className="w-full">Change default wage</div>
                <div className="w-1/3 ">
                  <input
                    type="number"
                    value={wage}
                    onChange={(e) => setWage(e.target.value)}
                    className="border-2  rounded text-center w-full"
                  />
                </div>
              </div>

              <div className="py-2 flex justify-between">
                <div className="w-full">Change default working hours</div>
                <div className="w-1/3 ">
                  <input
                    type="number"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="border-2  rounded text-center w-full"
                  />
                </div>
              </div>

              <div className="p-3 flex space-x-8">
                <div className="w-1/2">
                  <button className="bg-gray-200 w-full px-2 py-2 rounded border-gray-400 border-1 shadow text-gray-400">
                    Close
                  </button>
                </div>
                <div className="w-1/2">
                  <button
                    className="bg-green-200 w-full px-2 py-2 rounded border-green-400 border-1 shadow-lg shadow-indigo-500/40 text-green-800 font-bold"
                    onClick={submitHandler}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
