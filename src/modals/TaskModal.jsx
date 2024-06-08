import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import EllipsisMenu from "../components/EllipsisMenu"
import ellipsis from "../assets/ellipsis.svg"
import Subtask from "../components/SubTask"
import sliceBoards from "../redux/sliceBoards"


function TaskModal({ colIndex, taskIndex, setTaskModalActive }) {
  const dispatch = useDispatch()
  const boards = useSelector(state => state.boards)
  const board = boards.find(board => board.statusActive)
  const columns = board.columnsList
  const col = columns.find((column, i) => colIndex === i)
  const task = col.tasksList.find((col, i) => taskIndex === i)
  const subTasks = task.subTasks

  let completed = 0
  subTasks.forEach(subtask => {
    if(subtask.statusCompleted) {
      completed++
    }
  })

  const [statusTask, setstatusTask] = useState(task.statusTask)
  const [newColIndex, setNewColIndex] = useState(columns.indexOf(col))
  const [ellipsisMenuActive, setEllipsisMenuActive] = useState(false)
  const [deleteModalActive, setDeleteModalActive] = useState(false)

  const setActiveEditModal = () => {

  }

  const setActiveDeleteModal = () => {

  }

  const onClose = e => {
    if(e.target !== e.currentTarget) {
      return
    }
    dispatch(
      sliceBoards.actions.setTaskStatus({
        taskIndex, colIndex, newColIndex, statusTask
      })
    )
    setTaskModalActive(false)
  }

  const onChange = e => {
    setstatusTask(e.target.value)
    setNewColIndex(e.target.selectedIndex)
  }

  return (
    <div
    onClick={onClose}
    className="flex justify-center items-center bg-gray-500 bg-opacity-80 overflow-scroll scrollbar-hide fixed inset-0 z-50 px-2 py-4"
    >
      <div className="max-h-[95vh] m-auto scrollbar-hide overflow-y-scroll bg-white-main dark:bg-gray-500 text-gray-500 dark:text-white-main font-bold shadow-md shadow-gray-500 max-w-md w-full p-8 rounded-xl">
        <div className="w-full relative flex justify-between items-center">
          <h1 className="text-lg">
            {task.titleTask}
          </h1>
          <img
            src={ellipsis}
            onClick={() => {
            setEllipsisMenuActive(state => !state)
            }}
            className="cursor-pointer"
            />
            {
              ellipsisMenuActive && <EllipsisMenu
              setActiveEditModal={setActiveEditModal}
              setActiveDeleteModal={setActiveDeleteModal}
              type='Task'
              />
            }
        </div>
        <p className="text-sm font-semibold tracking-wide text-gray-400 pt-6">
          {task.descriptionTask}
        </p>
        <p className="text-sm tracking-widest pt-6 text-gray-400">
            Subtasks ({completed}) of {subTasks.length}
        </p>
        <div className="mt-3 space-y-2">
          {
            subTasks.map((subtask, i) => {
              return(
                <Subtask
                index={i}
                taskIndex={taskIndex}
                colIndex={colIndex}
                key={i}
                />
              )
            })
          }
        </div>
        {/* Current Status */}
        <div className="flex flex-col space-y-3 mt-8">
          <label className="text-sm text-gray-400 dark:text-white-main">
            Current Status
          </label>
          <select className="select-status px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border border-gray-200 focus:outline-orange-300 outline-none flex-grow"
          value={statusTask}
          onChange={onChange}
          >
            {
              columns.map((column, index) => (
                <option className="status-option" key={index}>
                  {column.titleColumn}
                </option>
              ))
            }
          </select>
        </div>
      </div>
    </div>
  )
}

export default TaskModal