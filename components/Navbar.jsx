import MiuiDrawer from "./MiuiDrawer";
import {LogoutIcon} from "@heroicons/react/solid";
import {signOut} from "next-auth/react";

function Navbar() {
  return (
    <div className="p-4 flex justify-between w-full">
      <MiuiDrawer />

      <div className="p-1 font-semibold text-xl">#Worklog 2.0</div>

      <div className="w-1/6 flex hover:cursor-pointer">
        <button
          className="text-right w-full font-bold text-lg flex"
          onClick={() => signOut()}
        >
          Log out
        </button>
        <LogoutIcon className="h-8 w-8 " />
      </div>
    </div>
  );
}

export default Navbar;
