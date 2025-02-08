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
    <div className="glassMorf ">
      <div className="flex-1">
        <a className="btn btn-ghost  text-xl " href="/">
          dex
          <span className="-rotate-10">
            <TypeScript  className="w-[30px] h-[20px] md:w-[40px] md:h-[30px]" />
          </span>
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 ">
          
          <li className="h-full">
            <form onSubmit={handleSubmit} className="h-full">
              <label className="input bg-transparent h-8">
                <Icon icon="pixelarticons:search" width="20" height="20" />
                <input
                  ref={inputRef}
                  type="search"
                  className="grow placeholder placeholder-zinc-600 focus:w-16 w-12 md:w-[10%]  transition-all duration-200"
                  placeholder="Beserk, Cowboy Bebop..."
                />
                <kbd className="kbd kbd-xs md:kbd-sm bg-transparent">Ctrl</kbd>
                <kbd className="kbd kbd-xs md:kbd-sm bg-transparent">K</kbd>
              </label>
            </form>
          </li>
          <li>
          <Link to={"/favorites"} className="btn btn-ghost btn-circle">
            <Icon icon="pixelarticons:heart"  className="w-10 h-6" />
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

                <svg
                  className="swap-off w-10 h-6  fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M13 0h-2v4h2zM0 11v2h4v-2zm24 0v2h-4v-2zM13 24h-2v-4h2zM8 6h8v2H8zM6 8h2v8H6zm2 10v-2h8v2zm10-2h-2V8h2zm2-14h2v2h-2zm0 2v2h-2V4zm2 18h-2v-2h2zm-2-2h-2v-2h2zM4 2H2v2h2v2h2V4H4zM2 22h2v-2h2v-2H4v2H2z"
                  />
                </svg>

                {/* moon icon */}
                <svg
                  className="swap-on w-10 h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M6 2h8v2h-2v2h-2V4H6zM4 6V4h2v2zm0 10H2V6h2zm2 2H4v-2h2zm2 2H6v-2h2zm10 0v2H8v-2zm2-2v2h-2v-2zm-2-4h2v4h2v-8h-2v2h-2zm-6 0v2h6v-2zm-2-2h2v2h-2zm0 0V6H8v6z"
                  />
                </svg>
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
