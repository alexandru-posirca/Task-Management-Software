import { useEffect, useState } from "react"
import Sidebar from "./Sidebar"
import { useSelector } from "react-redux"
import Column from "./Column"
import EditBoardModal from "../modals/EditBoardModal"

function Content() {

  const [windowSize, setWindowSize] = useState(
    [
      window.innerWidth,
      window.innerHeight
    ]
  )

  const [sidebarActive, setSidebarActive] = useState(true)

  const boards = useSelector((state) => state.boards)
  const board = boards.find((board) => board.statusActive)
  const columns = board.columnsList

  const [boardModalActive, setBoardModalActive] = useState(false)


  useEffect(() => {
    const handleResizeWindow = () => {
      setWindowSize([window.innerWidth, window. innerHeight])
    }

    window.addEventListener("resize", handleResizeWindow)

    return () => {
      window.removeEventListener("resize", handleResizeWindow)
    }
  }, [])

  return (
    <div
    className={windowSize[0] >= 768 && sidebarActive ? 'bg-gray-100 overflow-x-scroll scrollbar-hide flex gap-6 dark:bg-gray-500 ml-[261px] bg-opacity-70 md:flex-col xl:flex-row h-screen' : 'bg-gray-100 scrollbar-hide flex gap-4 dark:bg-gray-500 flex-col md:flex-row items-center md:items-start bg-opacity-70 md:pl-16 pt-[64px] md:pt-0'}
    >
      {
        windowSize[0] >= 768 && (
          <Sidebar sidebarActive={sidebarActive} setSidebarActive={setSidebarActive}/>
        )
      }
      <div className="md:pt-[70px] xl:flex w-full max-w-[467px] md:max-w-none xl:flex-wrap">
        <div className="xl:mt-[30px] m-5 xl:mr-3">
          <div className="flex items-center mb-2 gap-2
          ">
            <p className="font-semibold tracking-widest md:tracking-[2px] dark:text-white-main xl:text-md">
            Edit Board
            </p>
            <div
            onClick={() => {
              setBoardModalActive(true)
            }}
            className="pb-2 cursor-pointer"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 56 56"><path fill="#008B8B" d="m53.922 16.202l1.404-1.423c.674-.692.674-1.61.019-2.246l-.45-.449c-.598-.599-1.534-.543-2.17.094l-1.404 1.385Zm-21.505 19.39l3.818-1.703l16.303-16.283l-2.62-2.602l-16.285 16.283l-1.796 3.688c-.15.318.225.767.58.617M5.484 47.908h36.834c3.538 0 5.465-1.853 5.465-5.39V27.02l-3.013 3.013v12.634c0 1.554-.88 2.433-2.433 2.433H5.447c-1.554 0-2.434-.88-2.434-2.433v-15.74c0-1.554.88-2.434 2.434-2.434h30.302l2.826-2.807H5.484C1.947 21.686 0 23.539 0 27.076v15.441c0 3.538 1.947 5.39 5.484 5.39m4.735-10.706c1.33 0 2.415-1.086 2.415-2.396a2.404 2.404 0 0 0-2.415-2.396a2.388 2.388 0 0 0-2.395 2.396a2.4 2.4 0 0 0 2.395 2.396m7.524 0c1.33 0 2.415-1.086 2.415-2.396a2.404 2.404 0 0 0-2.415-2.396a2.393 2.393 0 0 0-2.414 2.396a2.404 2.404 0 0 0 2.414 2.396m7.506 0a2.413 2.413 0 0 0 2.395-2.396a2.4 2.4 0 0 0-2.395-2.396a2.404 2.404 0 0 0-2.415 2.396c0 1.31 1.086 2.396 2.415 2.396"></path></svg>
            </div>
          </div>
          <div
              onClick={() => {
                setBoardModalActive(true)
              }}
              className="flex justify-center items-center text-2xl font-semibold transition duration-300 scrollbar-hide min-h-[186px]  xl:min-h-[800px] xl:min-w-[178px]
              xl:w-full dark:bg-gray-100 bg-gray-200 text-gray-400 rounded-xl bg-opacity-30 cursor-pointer md:text-base">
              + New Column
          </div>
        </div>
        <>
        {columns.map((col, index) => (
            <Column key={index} colIndex={index}/>
          ))}
        </>
      {
       boardModalActive && (
        <EditBoardModal
        type='edit'
        setBoardModalActive={setBoardModalActive}
        />
       )
      }
      </div>
    </div>
  )
}

export default Content