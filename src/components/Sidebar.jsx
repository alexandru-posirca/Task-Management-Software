import { useDispatch, useSelector } from "react-redux"
import useDarkTheme from "../Hooks/useDarkTheme";
import { useState } from "react";
import sliceBoards from "../redux/sliceBoards";
import boardIcon from "../assets/board-icon.svg";

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
    className={sidebarActive ? 'bg-white-main dark:bg-gray-400 min-w-[261px] fixed top-[72px] h-screen z-20 left-0 items-center' : 'bg-orange-400 dark:bg-cyan-500 items-center justify-center top-auto bottom-10 cursor-pointer transition duration-300 transform fixed w-[56px] h-[48px] rounded-r-full p-0'}
    >
     {sidebarActive && (
      <div className="bg-white-main dark:bg-gray-400 w-full py-4 rounded-xl">
        <h3 className="dark:text-gray-200 text-gray-400 font-semibold mx-4 mb-5">
          ALL BOARDS ({boards?.length})
        </h3>
        <div className="flex flex-col justify-between">
          {boards.map((board, index) => (
            <div className={`flex items-center space-x-2 rounded-r-full px-5 mr-8 ease-in-out duration-500 py-4 dark:text-white ${board.statusActive && "bg-cyan-500 rounded-r-full text-white-main mr-8"}`}
            key={index}
            >
              <img src={boardIcon} className="h-8"/>
              <p className="text-lg font-semibold">
                {board.nameBoard}
              </p>
            </div>
          ))}
        </div>
      </div>
     )}
    </div>
  )
}

export default Sidebar