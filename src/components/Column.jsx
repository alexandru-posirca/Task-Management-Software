import { shuffle } from "lodash"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Task from "./Task"

function Column({ colIndex }) {

  const colors = [
    'bg-orange-300',
    'bg-gray-400',
    'bg-cyan-500',
    'bg-orange-300',
    'bg-orange-500',
    'bg-green-300',
    'bg-green-500'
  ]

  const [color, setColor] = useState(null)

  const dispatch = useDispatch()
  const boards = useSelector(state => state.boards)
  const board = boards.find(board => board.statusActive)
  const col = board.columnsList.find((col, i) => i === colIndex)

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [dispatch])

  return (
    <div
    className="max-w-[420px] px-5 md:px-0 w-full md:max-w-[350px] mx-5 scrollbar-hide pt-6 md:pt-[90px]">
      <p
      className="flex items-center gap-2 tracking-widest text-gray-400 font-semibold md:tracking-[3px]"
      >
        <span className={`size-4 rounded-full ${color}`}></span>
        {col.titleColumn} ({col.tasksList.length})
      </p>

      {
        col.tasksList.map((task, index) => (
          <Task key={index} taskIndex={index} colIndex={colIndex} />
        ))
      }

    </div>
  )
}

export default Column