import { useDispatch, useSelector } from "react-redux";
import sliceBoards from "../redux/sliceBoards";

function SubTask({ index, taskIndex, colIndex }) {
  const dispatch = useDispatch();
  const boards = useSelector(state => state.boards);
  const board = boards.find(board => board.statusActive);
  const columns = board.columnsList;
  const col = columns.find((column, i) => colIndex === i);
  const task = col.tasksList.find((col, i) => taskIndex === i);
  const subtask = task.subTasks.find((subtask, i) => i === index);
  const completed = subtask.statusCompleted;

  const onChange = () => {
    dispatch(
      sliceBoards.actions.setSubTaskCompleted({ index, taskIndex, colIndex })
    );
  };

  return (
    <div className="w-full flex items-center justify-start gap-4 p-3 rounded-md relative bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-500 dark:bg-gray-500">
      <input
        type="checkbox"
        className="size-4 accent-orange-300 cursor-pointer"
        checked={completed}
        onChange={onChange}
      />
        <p className={completed ? "line-through opacity-30" : "text-gray-400"}>
        {subtask.titleSubTask}
        </p>
    </div>
  );
}

export default SubTask;
