import Image from "next/image";

function UserInfo({username}) {
  return (
    <div className="p-2 flex justify-between bg-white shadow-lg rounded">
      <div className="semibold-bold text-lg underline-offset-4 text-black p-2 ">
        Howdy, {username}
      </div>
      <div className="w-12 h-12 relative mr-1 bg-gray-400 rounded-lg ">
        <Image
          src={`https://avatars.dicebear.com/api/female/${username}.svg?mood[]=happy`}
          layout="fill"
        />
      </div>
    </div>
  );
}

export default UserInfo;
