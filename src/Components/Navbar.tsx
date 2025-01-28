import React from "react";
import TypeScript from "../assets/typescript";
import { useNavigate } from "react-router-dom";
import { QueryContext } from "../App";
import { useContext } from "react";
import { useRef } from "react";
import { Icon } from "@iconify/react";

export default function Navbar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setQuery } = useContext(QueryContext);
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (inputRef.current) {
      setQuery(inputRef.current.value);
      navigate("/search");
    }
  };
  return (
    <div className="navbar bg-base-100 h-10 glassMorf  shadow-sm z-40 sticky top-0 rounded-md">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href="/">
          manga
          <span className="-rotate-10">
            <TypeScript width={"40px"} height={"30px"} />
          </span>
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <form onSubmit={handleSubmit}>
              <label className="input ">
                <Icon icon="pixelarticons:search" width="20" height="20" />
                <input
                  ref={inputRef}
                  type="search"
                  className="grow focus:w-full w-[20%] transition-all duration-200"
                  placeholder="Search"
                />
                <kbd className="kbd kbd-sm">Ctrl</kbd>
                <kbd className="kbd kbd-sm">K</kbd>
              </label>
            </form>
          </li>
          <li></li>
        </ul>
      </div>
    </div>
  );
}

export const Drawer = () => {
  return (
    <div className="drawer lg:drawer-open sticky top-2 hidden lg:flex">
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
            <a>
              {" "}
              <Icon
                icon="pixelarticons:home"
                width="20"
                height="20"
              /> Home{" "}
            </a>
          </li>
          <li>
            <a>
              {" "}
              <Icon icon="pixelarticons:heart" width="20" height="20" />
              Siguiendo
            </a>
          </li>
          <li>
            <a>
              {" "}
              <Icon icon="pixelarticons:book-open" width="20" height="20" />
              Library
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
