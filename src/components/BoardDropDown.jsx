function BoardDropDown({setActiveDropDown}) {

  return (
    <div className="py-10 px-6 absolute left-0 right-0 bottom-[-100vh] top-[76px] bg-gray-200"
    onClick={
      (e) => {
        if(e.target !== e.currentTarget) {
          return
        }
        setActiveDropDown(false)
      }
    }
    >
      <div className="bg-white-main shadow-md dark:bg-gray-500 shadow-gray-500 w-full py-4 rounded-xl">
        <h3 className="dark:text-gray-200 text-gray-500 font-semibold mx-4 mb-8">
          All boards
        </h3>
      </div>
    </div>
  )
}

export default BoardDropDown