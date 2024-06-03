import { useState } from 'react'
import arrowDown from "../assets/arrow-down.svg";
import arrowUp from "../assets/arrow-up.svg";
import BoardDropDown from './BoardDropDown';

function Header() {

  const [activeDropDown, setActiveDropDown] = useState(false);

  return (
    <div className='p-4 fixed left-0 right-0 bg-white-main dark:bg-gray-500 z-30'>
      <header className='flex justify-between dark:text-white-main items-center'>
        <div className='flex items-center space-x-2 md:space-x-4'>
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 640 512"><path fill="#ff3d00" d="M384 320H256c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h128c17.67 0 32-14.33 32-32V352c0-17.67-14.33-32-32-32M192 32c0-17.67-14.33-32-32-32H32C14.33 0 0 14.33 0 32v128c0 17.67 14.33 32 32 32h95.72l73.16 128.04C211.98 300.98 232.4 288 256 288h.28L192 175.51V128h224V64H192zM608 0H480c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h128c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32"></path></svg>
          <h3 className='hidden md:inline-block font-bold md:text-4xl'>
            Software
          </h3>
          <div className='flex items-center'>
            <h3 className='truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20'>
              Board
            </h3>
            <img src={activeDropDown ? arrowUp : arrowDown} alt="icon-dropdown" className='w-7 ml-2 md:hidden cursor-pointer' onClick={() => setActiveDropDown(state =>!state)} />
          </div>
        </div>

        <div className='flex space-x-4 items-center md:space-x-6'>
            <button className='button'>
              + Add new task
            </button>
            <button className='button py-1 px-3 md:hidden'>
              +
            </button>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="#ff3d00" d="M8.5 17c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m7-10c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2m-7 3c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m7 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m0 7c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m-7-14c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2"></path></svg>
        </div>
      </header>

      {activeDropDown && <BoardDropDown setActiveDropDown={setActiveDropDown}/>}
    </div>
  )
}

export default Header