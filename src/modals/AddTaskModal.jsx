import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import closeIcon from "../assets/close.svg";
import { useDispatch, useSelector } from "react-redux";
import sliceBoards from "../redux/sliceBoards";

function TaskModal({ type, action, device, setAddTaskModalActive, setTaskModalActive, taskIndex, prevColIndex = 0 }) {
  const dispatch = useDispatch()
  const [firstLoadActive, setFirstLoadActive] = useState(true)
  const [titleTask, setTitleTask] = useState('')
  const [descriptionTask, setDescriptionTask] = useState('')
  const [isChecked, setIsChecked] = useState(true)
  const board = useSelector(state => state.boards).find((board) => board.statusActive)
  const columns = board.columnsList;
  const col = columns.find((col, index) => index === prevColIndex)
  const task = col ? col.tasksList.find((task, index) => index === taskIndex) : []

  const [statusTask, setStatusTask] = useState(columns[prevColIndex].titleTask)
  const [newColIndex, setNewColIndex] = useState(prevColIndex)

  const [subTasks, setSubTasks] = useState(
    [
      { titleSubTask: '', statusCompleted : false, id : uuidv4() },
      { titleSubTask: '', statusCompleted : false, id : uuidv4() }
    ]
  )

  const onChangeStatus = e => {
    setStatusTask(e.target.value)
    setNewColIndex(e.target.selectedIndex)
  }

  const validate = () => {
    setIsChecked(false);
    if(!titleTask.trim()) {
      return false;
    }

    for(let i = 0; i < subTasks.length; i++) {
      if(!subTasks[i].titleSubTask.trim()) {
        return false
      }
    }

    setIsChecked(true)
    return true
  }

  if (type === 'edit' && firstLoadActive) {
    setSubTasks(
      task.subTasks.map(subtask => {
        return { ...subtask, id: uuidv4()}
      })
    )
    setTitleTask(task.titleTask)
    setDescriptionTask(task.descriptionTask)
    setFirstLoadActive(false)
  }

  const onDelete = id => {
    setSubTasks(prevState => prevState.filter(el => el.id !== id) )
  }


  const onChangeSubTasks = (id, valueNew) => {
    setSubTasks(prevState => {
      const stateNew = [...prevState]
      const subTask = stateNew.find(subTask => subTask.id === id)
      subTask.titleSubTask = valueNew
      return stateNew
    })
  }

  const onSubmit = type => {
    if(type === 'add') {
      dispatch(sliceBoards.actions.addTask({
        titleTask,
        descriptionTask,
        subTasks,
        statusTask,
        newColIndex
      }))
    } else {
      dispatch(sliceBoards.actions.editTask({
        titleTask,
        descriptionTask,
        subTasks,
        statusTask,
        taskIndex,
        prevColIndex,
        newColIndex
      }))
    }
  }

  return (
    <div
      onClick={e => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setAddTaskModalActive(false);
      }}
      className={
        device === "mobile"
          ? "p-4 pb-40 overflow-y-scroll flex absolute left-0 right-0 top-0 bottom-[-100vh] bg-black-main bg-opacity-80"
          : "px-4 pb-40 pt-6 overflow-y-scroll absolute inset-0 flex bg-black-main bg-opacity-30"
      }
    >
      <div
      className="overflow-y-scroll max-h-[95vh] bg-white-main dark:bg-gray-500 text-black-main  dark:text-white-main shadow-gray-500 scrollbar-hide m-auto w-full p-8 rounded-xl font-semibold shadow-md max-w-[420px] md:max-w-[800px]"
      >
        <h3 className="text-lg">
         {action === 'edit' ? 'Edit' : 'Add new'} Task
        </h3>
        { /* Title Task */}
        <div className="md:flex gap-6">
        <div className="md:w-6/12">
        <div className="flex flex-col mt-8 space-y-1  gap-2">
          <label className="text-gray-400 dark:text-white-main text-sm">
            Task Name
          </label>
          <input
            value={titleTask}
            onChange={(e)=> setTitleTask(e.target.value)}
            type="text"
            className="px-4 py-2 rounded-md text-sm border border-gray-300 focus:border-0 focus:outline-orange-300 bg-transparent ring-0 outline-none dark:text-black-main"
            placeholder="Enter the name of the task"
          />
        </div>
        { /* Description Task */}
        <div className="flex flex-col mt-6 space-y-1 gap-2">
          <label className="text-gray-400 dark:text-white-main text-sm">
            Task Description
          </label>
          <textarea
            value={descriptionTask}
            onChange={(e)=> setDescriptionTask(e.target.value)}
            className="px-4 py-2 min-h-[200px] rounded-md text-sm border border-gray-300 focus:border-0 focus:outline-orange-300 bg-transparent ring-0 outline-none dark:text-black-main"
            placeholder="Enter the description of the task"
          />
        </div>
        </div>
        { /* Subtasks*/}
        <div className="md:w-6/12">
          <div className="flex flex-col space-y-1 mt-6 md:mt-8  gap-2">
            <label className="text-gray-400 dark:text-white-main text-sm">
              Subtasks
            </label>

          {
            subTasks.map((subTask, index) => (
              <div
              key={index}
              className="w-full flex items-center"
              >
                <input
                onChange={(e) => {
                  onChangeSubTasks(subTask.id, e.target.value)
                }}
                type="text"
                value={subTask.titleSubTask}
                className="px-4 py-2 text-sm border border-gray-300 focus:outline-orange-300 bg-transparent outline-none focus:border-0 flex-grow rounded-md dark:text-black-main"
                placeholder="Enter the name of the subtask"
                />
                <img
                onClick={()=> {
                  onDelete(subTask.id)
                }}
                src={ closeIcon }
                className="cursor-pointer m-2 mr-0" />
              </div>
            ))
          }
            <button
            onClick={()=> {
              setSubTasks(state => [
                ...state,
                {
                  titleSubTask: '', statusCompleted: false, id: uuidv4()
                }
              ])
            }}
            className="w-full py-2 rounded-2xl items-center dark:text-orange-300 dark:bg-white-main bg-orange-300 text-white-main"
            >
              + Add New Subtask
            </button>
          </div>
      {/*Status section*/}
        <div className="flex flex-col mt-6 space-y-3">
          <label className="text-sm dark:text-white-main text-gray-300">
            Current status
          </label>
          <select
          value={statusTask}
          onChange={onChangeStatus}
          className="select-status px-4 py-2 rounded-md text-sm outline-none bg-transparent flex flex-grow focus:border-0 border border-gray-200 focus:outline-orange-300 dark:text-black-main">
            {columns.map((column, index) => (
              <option
              value={column.titleColumn}
              key={index}
              >
                {column.titleColumn}
              </option>
            ))}
          </select>
          <button
          onClick={()=> {
            const checked = validate();
            if(checked) {
              onSubmit(type)
              setAddTaskModalActive(false)
              type === "edit" && setTaskModalActive(false);
            }
          }}
          className="w-full text-white-main bg-cyan-300 py-2 rounded-2xl items-center !mt-4"
          >
            { type === 'edit' ? 'Save edit' : 'Create task'}
          </button>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
