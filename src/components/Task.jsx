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

  return (
    <div>
      <div
      onClick={() => {
        setTaskModalActive(true)
      }}
      className="py-6 px-3 rounded-lg first:my-5 bg-white-main dark:bg-gray-500 shadow-gray-200 shadow-lg hover:text-orange-300 dark:text-white-main dark:hover:text-orange-300 cursor-pointer">
        <p className="tracking-wide font-bold">
          {task.titleTask}
        </p>
        <p className="text-xs tracking-tighter mt-2 text-gray-400 font-bold">
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