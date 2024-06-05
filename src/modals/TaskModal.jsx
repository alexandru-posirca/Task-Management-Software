import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import closeIcon from "../assets/close.svg";

function TaskModal({ action, device, setActiveTaskModal }) {
  const [titleTask, setTitleTask] = useState('')
  const [descriptionTask, setDescriptionTask] = useState('')

  const [subTasks, setSubTasks] = useState(
    [
      { titleSubTask: '', statusCompleted : false, id : uuidv4() },
      { titleSubTask: '', statusCompleted : false, id : uuidv4() }
    ]
  )

  const onDelete = id => {
    setSubTasks( perState => perState.filter(el => el.id !== id) )
  }

  const onChange = (id, valueNew
  ) => {
    setSubTasks(pervState => {
      const stateNew = [...pervState]
      const subTask = stateNew.find(subTask => subTask.id === id)
      subTask.titleSubTask = valueNew
      return stateNew
    })
  }

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setActiveTaskModal(false);
      }}
      className={
        device === "mobile"
          ? "p-6 pb-40 overflow-y-scroll flex absolute left-0 right-0 top-0 bottom-[-100vh] bg-black-main bg-opacity-80"
          : "p-6 pb-40 overflow-y-scroll absolute left-0 right-0 top-0 bottom-[-100vh] flex bg-black-main bg-opacity-80"
      }
    >
      <div
      className="overflow-y-scroll max-h-[95vh] bg-white-main dark:bg-gray-500 text-black-main  dark:text-white-main shadow-gray-500 scrollbar-hide m-auto w-full p-8 rounded-xl max-w-md font-bold shadow-md"
      >
        <h3 className="text-lg">
         {action === 'edit' ? 'Edit' : 'Add new'} Task
        </h3>
        { /* Title Task */}
        <div className="flex flex-col mt-8 space-y-1">
          <label className="text-gray-400 dark:text-white-main text-sm">
            Task Name
          </label>
          <input
            value={titleTask}
            onChange={(e)=> setTitleTask(e.target.value)}
            type="text"
            className="px-4 py-2 rounded-md text-sm border border-gray-400 focus:border-0 focus:outline-green-300 bg-transparent ring-0 outline-none"
            placeholder="Lorem ipsum"
          />
        </div>
        { /* Description Task */}
        <div className="flex flex-col mt-8 space-y-1">
          <label className="text-gray-400 dark:text-white-main text-sm">
            Task Name
          </label>
          <textarea
            value={descriptionTask}
            onChange={(e)=> setDescriptionTask(e.target.value)}
            className="px-4 py-2 min-h-[200px] rounded-md text-sm border border-gray-400 focus:border-0 focus:outline-green-300 bg-transparent ring-0 outline-none"
            placeholder="Lorem ipsum description"
          />
        </div>
        { /* Subtasks*/}
        <div className="flex flex-col space-y-1 mt-8">
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
                onChange(subTask.id, e.target.value)
              }}
              type="text"
              value={subTask.titleSubTask}
              className="px-4 py-2 text-sm border border-gray-500 focus:outline-green-300 bg-transparent outline-none focus:border-0 flex-grow rounded-md"
              />
              <img
              onClick={()=> {
                onDelete(subTask.id)
              }}
              src={ closeIcon }
              className="cursor-pointer m-2" />
            </div>
          ))
        }
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
