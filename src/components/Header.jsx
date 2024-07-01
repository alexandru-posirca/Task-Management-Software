import { useState } from 'react'
import arrowDown from "../assets/arrow-down.svg";
import arrowUp from "../assets/arrow-up.svg";
import BoardDropDown from './BoardDropDown';
import AddTaskModal from '../modals/AddTaskModal';
import boardIcon from "../assets/board-icon.svg";

function Header() {

  const [activeDropDown, setActiveDropDown] = useState(false);
  const [taskModalActive, setTaskModalActive] = useState(false);

  return (
    <div className='px-4 py-3 fixed left-0 right-0 bg-white-main shadow-sm dark:shadow-gray-300 shadow-gray-100 dark:bg-gray-500 z-30'>
      <header className='flex justify-between dark:text-white-main items-center'>
        <div className='flex items-center space-x-2 md:space-x-4'>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 16 16"><path fill="#ff3d00" d="M2 2h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1m4.655 8.595a.75.75 0 0 1 0 1.06L4.03 14.28a.75.75 0 0 1-1.06 0l-1.5-1.5a.749.749 0 0 1 .326-1.275a.75.75 0 0 1 .734.215l.97.97l2.095-2.095a.75.75 0 0 1 1.06 0M9.75 2.5h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1 0-1.5m0 5h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1 0-1.5m0 5h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1 0-1.5m-7.25-9v3h3v-3Z"></path></svg>
          <h3 className='hidden md:inline-block font-semibold md:text-2xl'>
            Task Vision
          </h3>
          <div className='flex items-center'>
            <img src={boardIcon} className="w-8 ml-1 md:ml-[50px] hidden md:block" alt="board-icon" width="32" height="32"></img>
            <h3 className='truncate max-w-[200px] md:text-2xl text-xl font-semibold ml-1 md:ml-1'>
              Board
            </h3>
            <img src={activeDropDown ? arrowUp : arrowDown} alt="icon-dropdown" className='ml-2 md:hidden cursor-pointer' width="28" height="28" onClick={() => setActiveDropDown(state =>!state)} />
          </div>
        </div>

        <div className='flex space-x-4 items-center md:space-x-6'>
            <button className='hidden md:block button'
              onClick={()=> {
                setTaskModalActive(prevState => !prevState)
              }}
            >
              + Add New Task
            </button>
            <button
            onClick={()=> {
              setTaskModalActive(prevState => !prevState)
            }}
            className='button py-1 px-3 md:hidden'>
              +
            </button>
        </div>
      </header>

      {activeDropDown && <BoardDropDown setActiveDropDown={setActiveDropDown}/>}

      { taskModalActive && <AddTaskModal device='mobile' setAddTaskModalActive={setTaskModalActive} type="add"/> }

    </div>
  )
}

export default Header