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
    className={windowSize[0] >= 768 && sidebarActive ? 'bg-gray-100 overflow-x-scroll h-screen scrollbar-hide flex gap-6 dark:bg-gray-500 ml-[261px] bg-opacity-70' : 'bg-gray-100 overflow-x-scroll h-screen scrollbar-hide flex gap-6 dark:bg-gray-500 flex-col items-center pt-[70px] bg-opacity-70'}
    >
      {
        windowSize[0] >= 768 && (
          <Sidebar/>
        )
      }
      {columns.length > 0 ? (
        <>
        {columns.map((col, index) => (
            <Column key={index} colIndex={index}/>
          ))}
        <div
          onClick={() => {
            setBoardModalActive(true)
          }}
           className="h-screen flex justify-center items-center text-2xl font-bold transition duration-300 scrollbar-hide mb-2 mx-5 pt-[90px] min-w-[280px] dark:bg-gray-500 bg-gray-200 text-gray-300 mt-[145px] rounded-lg bg-opacity-40 cursor-pointer">
          + New Column
          </div>
        </>
      ) : (
      <>
        <BoardEmpty type="edit"/>
      </>
      )}
      {
       boardModalActive && (
        <EditBoardModal
        type='edit'
        setBoardModalActive={setBoardModalActive}
        />
       )
      }
    </div>
  )
}

export default Content