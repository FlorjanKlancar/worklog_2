import React, {useState} from "react";
import {useSession} from "next-auth/react";

function ChangeDefaultValues() {
  const {data: session} = useSession();

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
    <div className=" text-sm p-3 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full divide-y-2 divider-black divider-opacity-60">
      <div className="pb-2 text-lg text-center text-black font-bold">
        User info
      </div>

      <div className="py-2 flex justify-between">
        <div className="w-full">Change default username</div>
        <div className="w-1/2 ">
          <input
            type="text"
            value={session.user.name}
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
  );
}

export default ChangeDefaultValues;
