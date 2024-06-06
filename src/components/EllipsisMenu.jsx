function EllipsisMenu({ type, setActiveEditModal, setActiveDeleteModal}) {
  return (
    <div
    className={
      type === 'Boards'
      ? "absolute top-16 right-5" : 'absolute top-6 right-4'
    }
    >
      <div className="flex items-center justify-end">
        <div
        className="text-sm w-40 font-medium z-50 shadow-md shadow-gray-500 bg-white-main dark:bg-gray-500 space-y-4 py-5 px-4 rounded-lg h-auto pr-12"
        >
          <p
          onClick={() => {
              setActiveEditModal()
          }}
          className="cursor-pointer dark:text-gray-300 text-gray-500"
          >
            Edit {type}
          </p>
          <p
          onClick={() => setActiveDeleteModal()}
          className="cursor-pointer text-orange-500"
          >
            Delete {type}
          </p>
        </div>
      </div>
    </div>
  )
}

export default EllipsisMenu
