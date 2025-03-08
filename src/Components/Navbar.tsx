import React from "react";
import TypeScript from "../assets/typescript";
import { useNavigate } from "react-router-dom";
import { QueryContext } from "../App";
import { useContext } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
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
    <div className="glassMorf h-full w-full  bg-current rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">
      <div className="flex-1">
        <a className="btn btn-ghost  text-xl " href="/">
          dex
          <span className="-rotate-10">
            <TypeScript className="w-[30px] h-[20px] md:w-[40px] md:h-[30px]" />
          </span>
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 ">
          
          <li className="h-full">
            <form onSubmit={handleSubmit} className="h-full">
              <label className="input bg-transparent h-8">
              <Icon icon="lucide:search" width="18" height="18" />
                <input
                  ref={inputRef}
                  type="search"
                  className="grow placeholder placeholder-base-content focus:w-16 w-12 md:w-[10%]  transition-all duration-200"
                  placeholder="Beserk, Cowboy Bebop..."
                />
                <kbd className="kbd kbd-xs md:kbd-sm bg-transparent">Ctrl</kbd>
                <kbd className="kbd kbd-xs md:kbd-sm bg-transparent">K</kbd>
              </label>
            </form>
          </li>
          <li>
          <Link to={"/favorites"} className="btn btn-ghost btn-circle">
          <Icon icon="lucide:heart" width="24" height="24" />
          </Link>
          </li>
          <li>
            <button className="btn btn-circle btn-ghost">
              <label className="swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input
                  type="checkbox"
                  className="theme-controller"
                  value="synthwave"
                />

                {/* sun icon */}

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 3v1m0 16v1m-9-9h1m16 0h1m-2.636-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707"/></g></svg>

                {/* moon icon */}
                
              </label>
            </button>
          </li>
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
              <Icon icon="lucide:home" width="20" height="20" /> Home{" "}
            </a>
          </li>
          <li>
            <a>
              {" "}
              <Icon icon="lucide:heart" width="20" height="20" />
              Siguiendo
            </a>
          </li>
          <li>
            <a>
              {" "}
              <Icon icon="lucide:heart" width="20" height="20" />
              Library
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
