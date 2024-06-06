import { useEffect, useState } from "react"
import Sidebar from "./Sidebar"
import { useSelector } from "react-redux"
import Column from "./Column"

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
    className={windowSize[0] >= 768 && sidebarActive ? 'bg-gray-100 overflow-x-scroll h-screen scrollbar-hide flex gap-6 dark:bg-gray-500 ml-[261px]' : 'bg-gray-100 overflow-x-scroll h-screen scrollbar-hide flex gap-6 dark:bg-gray-500'}
    >
      {
        windowSize[0] >= 768 && (
          <Sidebar/>
        )
      }

      {
        columns.map((col, index) => (
          <Column key={index} colIndex={index}/>
        ))
      }

    </div>
  )
}

export default Content