function DeleteTaskModal({ type, title, onDeleteBttnClick, setDeleteModalActive }) {
  return (
    <div
    onClick={(e) => {
      if (e.target !== e.currentTarget) {
        return;
      }
      setDeleteModalActive(false)
    }}
    className="fixed inset-0 p-4 overflow-scroll scrollbar-hide z-50 flex justify-center items-center bg-gray-500 bg-opacity-80">
      <div className="m-auto bg-white-main dark:bg-gray-400 text-black-main dark:text-white-main scrollbar-hide overflow-y-scroll max-h-[95vh] max-w-[420px] w-full p-8 rounded-xl font-bold">
        <h3 className="text-red-400 font-bold text-xl">
          Delete this {type}?
        </h3>
        {type === 'task' ? (
          <p className="tracking-wide text-xs pt-6 text-gray-300 dark:text-gray-200">
            Are you certain you want to permanently delete the task <span className="italic font-semibold">"{title}"</span> and all its subtasks?
            <span className="block mt-4 font-semibold">
            *This action cannot be reversed
            </span>
          </p>
        ) : (
          <p className="tracking-wide text-xs pt-6 text-gray-400">
            Are you certain you want to delete the {title} board? This action will permanently remove all columns and tasks and cannot be reversed.
          </p>
        )}
        <div className="w-full flex justify-center items-center mt-4 space-x-4">
            <button
            onClick={onDeleteBttnClick}
            className="w-full py-2 rounded-full bg-red-400 text-white-main hover:opacity-75 font-semibold"
            >
              Delete
            </button>
            <button
            onClick={() => {
              setDeleteModalActive(false)
            }}
            className="w-full py-2 rounded-full text-gray-500 items-center dark:bg-white-main hover:opacity-75 font-semibold bg-gray-100"
            >
              Cancel
            </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteTaskModal