import MiuiDrawer from "./MiuiDrawer";

function Navbar() {
  return (
    <div className="p-4 flex justify-between ">
      <MiuiDrawer />

      <div className="p-1 font-semibold text-xl">#Worklog 2.0</div>
    </div>
  );
}

export default Navbar;
