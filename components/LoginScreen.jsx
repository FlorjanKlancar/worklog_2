import React, { useState, useEffect } from "react";
import Image from "next/image";

function LoginScreen({ setIsAuth }) {
  const [image, setImage] = useState(randomString(6));

  function randomString(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  useEffect(() =>
    setTimeout(() => {
      setImage(randomString(6));
    }, 2000)
  );

  return (
    <div className="w-full  h-full flex flex-col justify-center">
      <div className="h-32 w-full relative -mt-32">
        <Image
          src={`https://avatars.dicebear.com/api/female/${image}.svg?mood[]=happy`}
          layout="fill"
        />
      </div>

      <div className="w-1/2 mx-auto rounded-lg bg-sky-300 p-1 mt-8">
        <input
          type="text"
          className="w-full rounded-lg p-2 placeholder-gray-400 outline-none "
          placeholder="Username"
        />
      </div>

      <div className="w-1/2 mx-auto rounded-lg bg-sky-300 p-1 mt-2">
        <input
          type="password"
          className="w-full rounded-lg p-2 placeholder-gray-400 outline-none "
          placeholder="Password"
        />
      </div>

      <div
        className="w-1/2 mx-auto rounded bg-blue-400 py-2 mt-4 text-center font-bold text-gray-300 hover:bg-blue-800 hover:cursor-pointer hover:text-white hover:scale-105 transition delay-150 duration-300 ease-in-out"
        onClick={() => setIsAuth(true)}
      >
        Login
      </div>
    </div>
  );
}

export default LoginScreen;
