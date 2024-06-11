import { useState } from "react";
import { useSelector } from "react-redux";
import boardIcon from "../assets/board-icon.svg";
import { Switch } from "@headlessui/react";
import useDarkTheme from "../Hooks/useDarkTheme";

function BoardDropDown({ setActiveDropDown }) {
  const [typeTheme, setTypeTheme] = useDarkTheme();
  const [darkTheme, setDarkTheme] = useState(
    typeTheme === "light" ? true : false
  );

  const toggleDarkTheme = (checked) => {
    setTypeTheme(typeTheme);
    setDarkTheme(checked);
  };

  const boards = useSelector((state) => state.boards);

  return (
    <div
      className="p-5 absolute left-0 right-0 bottom-[-100vh] top-[64px] bg-gray-100 dark:bg-gray-500"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setActiveDropDown(false);
      }}
    >
      <div className="bg-white-main w-full py-4 rounded-xl shadow-gray-200 shadow-md">
        <h3 className="text-gray-500 font-semibold mx-4 mb-8">
          All boards ({boards?.length})
        </h3>
        <div>
          {boards.map((board, index) => (
            <div
              className={`flex items-center space-x-2 px-5 py-2 ${
                board.statusActive &&
                "bg-cyan-500 rounded-r-full text-white-main mr-8"
              }`}
              key={index}
            >
              <img src={boardIcon} className="h-8" alt="board-icon" width="32" height="32" />
              <p className="text-lg font-semibold">{board.nameBoard}</p>
            </div>
          ))}

          <div className="mx-2 p-2 space-x-2 bg-orange-300 dark:bg-gray-300 flex justify-center items-center rounded-2xl bg-opacity-90">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 256 256"
            >
              <g fill="#ffff">
                <path
                  d="M184 128a56 56 0 1 1-56-56a56 56 0 0 1 56 56"
                  opacity=".2"
                ></path>
                <path  d="M120 40V16a8 8 0 0 1 16 0v24a8 8 0 0 1-16 0m72 88a64 64 0 1 1-64-64a64.07 64.07 0 0 1 64 64m-16 0a48 48 0 1 0-48 48a48.05 48.05 0 0 0 48-48M58.34 69.66a8 8 0 0 0 11.32-11.32l-16-16a8 8 0 0 0-11.32 11.32Zm0 116.68l-16 16a8 8 0 0 0 11.32 11.32l16-16a8 8 0 0 0-11.32-11.32M192 72a8 8 0 0 0 5.66-2.34l16-16a8 8 0 0 0-11.32-11.32l-16 16A8 8 0 0 0 192 72m5.66 114.34a8 8 0 0 0-11.32 11.32l16 16a8 8 0 0 0 11.32-11.32ZM48 128a8 8 0 0 0-8-8H16a8 8 0 0 0 0 16h24a8 8 0 0 0 8-8m80 80a8 8 0 0 0-8 8v24a8 8 0 0 0 16 0v-24a8 8 0 0 0-8-8m112-88h-24a8 8 0 0 0 0 16h24a8 8 0 0 0 0-16"></path>
              </g>
            </svg>
            <Switch
              checked={darkTheme}
              onChange={toggleDarkTheme}
              className="bg-gray-100 bg-opacity-100 relative inline-flex h-6 w-11 items-center rounded-full"
            >
              <span
                className={` ${
                  darkTheme ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-cyan-300 transition`}
              ></span>
            </Switch>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="#ffffff"
                d="M20.958 15.325c.204-.486-.379-.9-.868-.684a7.684 7.684 0 0 1-3.101.648c-4.185 0-7.577-3.324-7.577-7.425a7.28 7.28 0 0 1 1.134-3.91c.284-.448-.057-1.068-.577-.936C5.96 4.041 3 7.613 3 11.862C3 16.909 7.175 21 12.326 21c3.9 0 7.24-2.345 8.632-5.675"
              ></path>
              <path
                fill="#ffffff"
                d="M15.611 3.103c-.53-.354-1.162.278-.809.808l.63.945a2.332 2.332 0 0 1 0 2.588l-.63.945c-.353.53.28 1.162.81.808l.944-.63a2.332 2.332 0 0 1 2.588 0l.945.63c.53.354 1.162-.278.808-.808l-.63-.945a2.332 2.332 0 0 1 0-2.588l.63-.945c.354-.53-.278-1.162-.809-.808l-.944.63a2.332 2.332 0 0 1-2.588 0z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoardDropDown;
