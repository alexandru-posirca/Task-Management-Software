import { shuffle } from "lodash"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Task from "./Task"
import sliceBoards from "../redux/sliceBoards"

function Column({ colIndex }) {

  const colors = [
    'bg-gray-400',
    'bg-cyan-500',
    'bg-orange-300',
    'bg-orange-400',
    'bg-orange-500',
    'bg-cyan-300',
    'bg-green-500',
    "bg-black-main",
    "bg-gray-200",
    "bg-gray-400",
    "bg-blue-500",
    'bg-cyan-500',
    "bg-red-400"
  ]

  const [color, setColor] = useState(null)

  const dispatch = useDispatch()
  const boards = useSelector(state => state.boards)
  const board = boards.find(board => board.statusActive)
  const col = board.columnsList.find((col, i) => i === colIndex)

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [dispatch])

  const handleOnDragOver = e => {
    e.preventDefault()
  }

  const handleOnDrop = e => {
    const {prevColIndex, taskIndex} = JSON.parse(
      e.dataTransfer.getData("text")
    )
    if(colIndex !== prevColIndex) {
      dispatch(sliceBoards.actions.dragTask({colIndex, prevColIndex, taskIndex})
      )
    }
  }

  return (
    <div
    onDrop={handleOnDrop}
    onDragOver={handleOnDragOver}
    className="xl:max-w-[174px] px-5 md:px-0 xl:w-full md:mx-[16px] scrollbar-hide mt-11 md:flex flex-wrap md:gap-6 md:items-start xl:block last:pb-6 flex-col">
      <p
      className="flex items-center gap-2 tracking-widest text-gray-400 dark:text-gray-100 font-semibold md:tracking-[2px] xl:text-md"
      >
        <span className={`size-4 rounded-full ${color}`}></span>
        {col.titleColumn} ({col.tasksList.length})
      </p>
      <div className="md:flex md:flex-wrap md:gap-5 xl:block">
        {
          col.tasksList.map((task, index) => (
            <Task key={index} taskIndex={index} colIndex={colIndex} />
          ))
        }
      </div>

    </div>
  )
}

export default Column