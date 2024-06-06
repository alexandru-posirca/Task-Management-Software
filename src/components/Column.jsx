import { shuffle } from "lodash"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

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
    className="min-w-[280px] mx-5 scrollbar-hide pt-[90px]">
      <p
      className="flex items-center gap-2 tracking-widest text-gray-400 font-semibold md:tracking-[3px]"
      >
        <span className={`size-4 rounded-full ${color}`}></span>
        {col.titleColumn} ({col.tasksList.length})
      </p>
    </div>
  )
}

export default Column