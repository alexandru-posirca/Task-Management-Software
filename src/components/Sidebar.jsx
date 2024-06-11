import { useDispatch, useSelector } from "react-redux"
import useDarkTheme from "../Hooks/useDarkTheme";
import { useState } from "react";
import boardIcon from "../assets/board-icon.svg";
import { Switch } from "@headlessui/react";

function Sidebar({ sidebarActive, setSidebarActive, }) {
  const dispatch = useDispatch()
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
    className={sidebarActive ? 'bg-white-main dark:bg-white-main min-w-[261px] fixed top-[68px] z-20 left-0 items-start flex justify-between flex-col h-full pb-16' : 'bg-cyan-300 dark:bg-cyan-500 items-center justify-center top-auto bottom-2 cursor-pointer transition duration-300 transform fixed w-[56px] rounded-r-full left-0'}
    >
     {sidebarActive && (
      <div className="bg-white-main dark:bg-white-main w-full pt-4  md:flex flex-col justify-between h-full">
        <div>
        <h3 className="text-gray-400 font-semibold mx-4 mb-5">
          ALL BOARDS ({boards?.length})
        </h3>
        <div className="flex flex-col justify-between">
          <div>
            {boards.map((board, index) => (
              <div className={`flex items-center space-x-2 rounded-r-full px-5 mr-8 ease-in-out duration-500 py-2 dark:text-white ${board.statusActive && "bg-cyan-500 rounded-r-full text-white-main mr-8"}`}
              key={index}
              >
                <img src={boardIcon} className="h-8" alt="board-icon" width="32" height="32"/>
                <p className="text-lg font-semibold text-ellipsis overflow-hidden whitespace-nowrap w-[148px]">
                  {board.nameBoard}
                </p>
              </div>
            ))}
            </div>
        </div>
        </div>
        <div className="mx-2 p-2 space-x-2 bg-orange-300 dark:bg-gray-200 dark:bg-opacity-100 flex justify-center items-center rounded-2xl bg-opacity-90">
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
     )}
      {sidebarActive ? (
        <div
        onClick={() => { setSidebarActive(state => !state)}}
        className="flex items-center text-lg mt-2 pl-2 pr-[72px] font-semibold rounded-r-full hover:text-white-main cursor-pointer px-2 py-1 hover:bg-cyan-500 justify-center my-3 space-x-2 text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path fill="#ffae00" d="M25.19 20.4a6.8 6.8 0 0 0 .43-2.4a6.86 6.86 0 0 0-6.86-6.86a6.8 6.8 0 0 0-2.37.43L18 13.23a5 5 0 0 1 .74-.06A4.87 4.87 0 0 1 23.62 18a5 5 0 0 1-.06.74Z" className="clr-i-outline clr-i-outline-path-1"></path><path fill="#ffae00" d="M34.29 17.53c-3.37-6.23-9.28-10-15.82-10a16.8 16.8 0 0 0-5.24.85L14.84 10a14.8 14.8 0 0 1 3.63-.47c5.63 0 10.75 3.14 13.8 8.43a17.8 17.8 0 0 1-4.37 5.1l1.42 1.42a19.9 19.9 0 0 0 5-6l.26-.48Z" className="clr-i-outline clr-i-outline-path-2"></path><path fill="#ffae00" d="m4.87 5.78l4.46 4.46a19.5 19.5 0 0 0-6.69 7.29l-.26.47l.26.48c3.37 6.23 9.28 10 15.82 10a16.9 16.9 0 0 0 7.37-1.69l5 5l1.75-1.5l-26-26Zm9.75 9.75l6.65 6.65a4.8 4.8 0 0 1-2.5.72A4.87 4.87 0 0 1 13.9 18a4.8 4.8 0 0 1 .72-2.47m-1.45-1.45a6.85 6.85 0 0 0 9.55 9.55l1.6 1.6a14.9 14.9 0 0 1-5.86 1.2c-5.63 0-10.75-3.14-13.8-8.43a17.3 17.3 0 0 1 6.12-6.3Z" className="clr-i-outline clr-i-outline-path-3"></path><path fill="none" d="M0 0h36v36H0z"></path></svg>
          {sidebarActive && <p>Hide Sidebar</p>}
        </div>
      )
    :
     <div
      onClick={() => setSidebarActive(state => !state)}
      className="px-[6px] py-[2px]"
     >
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="#ffae00" d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0"></path></svg>
     </div>
    }
    </div>
  )
}

export default Sidebar