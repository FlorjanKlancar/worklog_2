import Image from "next/image";
import {useState} from "react";
import ChangeDefaultValues from "./ChangeDefaultValues";
import GenericModal from "./GenericModal";
import {useSession} from "next-auth/react";

function UserInfo() {
  const [modal, openModal] = useState(false);

  const {data: session} = useSession();

  return (
    <div className="p-2 flex justify-between bg-white shadow-lg rounded">
      <div className="semibold-bold text-lg underline-offset-4 text-black p-2 ">
        Howdy, {session?.user?.name}
      </div>
      <div
        className="w-12 h-12 relative mr-1 bg-gray-400 rounded-lg hover:cursor-pointer"
        onClick={() => openModal(true)}
      >
        <Image
          src={`https://avatars.dicebear.com/api/female/${session?.user?.name}.svg?mood[]=happy`}
          layout="fill"
        />
      </div>

      {modal && (
        <GenericModal modal={modal} openModal={openModal}>
          <ChangeDefaultValues />
        </GenericModal>
      )}
    </div>
  );
}

export default UserInfo;
