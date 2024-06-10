import { useState } from "react"
import { useSelector } from "react-redux"
import TaskModal from "../modals/TaskModal"

function Task({ taskIndex, colIndex}) {
  const boards = useSelector(state => state.boards)
  const board = boards.find(board => board.statusActive)
  const columns = board.columnsList
  const col = columns.find((col, i) => i === colIndex)
  const task = col.tasksList.find((task, i) => i === taskIndex)

  const [taskModalActive, setTaskModalActive] = useState(false)

  let completed = 0
  let subtasks = task.subTasks
  subtasks.forEach(subtask => {
    if(subtask.statusCompleted) {
      completed++
    }
  })

  const handleOnDrag = e => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex})
    )
  }

  return (
    <div>
      <div
      onClick={() => {
        setTaskModalActive(true)
        }}
        onDragStart={handleOnDrag}
        draggable
      className="py-6 px-3 rounded-lg my-5 md:my-0 xl:my-5 bg-white-main shadow-gray-200 shadow-md hover:text-orange-400 dark:text-gray-500 dark:hover:text-orange-400 cursor-pointer dark:shadow-gray-300">
        <p className="tracking-wide font-semibold">
          {task.titleTask}
        </p>
        <p className="text-xs tracking-tighter mt-2 text-gray-400 font-semibold">
          {completed} of {subtasks.length} completed tasks
        </p>
      </div>
      {
        taskModalActive && (
        <TaskModal
        colIndex={colIndex}
        taskIndex={taskIndex}
        setTaskModalActive={setTaskModalActive}
        />)
      }
    </div>
  )
}

export default Task