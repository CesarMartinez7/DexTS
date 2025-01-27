import TypeScript from "../assets/typescript";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm z-40 sticky top-0 ">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href="/">
          <span className="rotate-12">
            <TypeScript width={"40px"} height={"30px"} />
          </span>
          manga{" "}
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Link</a>
          </li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li>
                  <a>Link 1</a>
                </li>
                <li>
                  <a>Link 2</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}

export const Drawer = () => {
  return (
    <div className="drawer lg:drawer-open sticky top-2">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Siguiendo</a>
          </li>
          <li>
            <a>Library</a>
          </li>
          <li>
            <a>MDList</a>
          </li>
          <li>
            <a>My Groups</a>
          </li>
          <li>
            <a>Reading History</a>
          </li>
          <li>
            <a>Random</a>
          </li>
          <li>
            <a>Rencently Added</a>
          </li>
          <li>
            <a>Latest updates</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
