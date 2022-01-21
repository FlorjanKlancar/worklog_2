import Image from "next/image";
import { useState } from "react";
import Modal from "./Modal";

function UserInfo({ username }) {
  const [modal, openModal] = useState(false);

  return (
    <div className="p-2 flex justify-between bg-white shadow-lg rounded">
      <div className="semibold-bold text-lg underline-offset-4 text-black p-2 ">
        Howdy, {username}
      </div>
      <div
        className="w-12 h-12 relative mr-1 bg-gray-400 rounded-lg hover:cursor-pointer"
        onClick={() => openModal(true)}
      >
        <Image
          src={`https://avatars.dicebear.com/api/female/${username}.svg?mood[]=happy`}
          layout="fill"
        />
      </div>

      <Modal modal={modal} openModal={openModal} />
    </div>
  );
}

export default UserInfo;
