import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidv4 } from "uuid";
import sliceBoards from "../redux/sliceBoards";
import closeIcon from "../assets/close.svg";
import { useState } from "react";

function EditBoardModal({ setBoardModalActive, type, }) {
  const dispatch = useDispatch();
  const [firstLoadActive, setfirstLoadActive] = useState(true);
  const [nameBoard, setNameBoard] = useState("")
  const [newColumnsList, setNewColumnsList] = useState([
     { titleColumn: "To do", tasksList: [], id: uuidv4() },
     { titleColumn: "Doing", tasksList: [], id: uuidv4() }
  ])
  const [isChecked, setIsChecked] = useState(true);

  const board = useSelector(state => state.boards).find(
    board => board.statusActive
  );

  if(type === 'edit' && firstLoadActive) {
    setNewColumnsList(
      board.columnsList.map(col => {
        return { ...col, id: uuidv4()};
        })
      );
      setNameBoard(board.nameBoard)
      setfirstLoadActive(false)
  }

  const onChangeColumn = (id, newValue) => {
    setNewColumnsList(prevState => {
      const newState = [...prevState];
      const column = newState.find(col => col.id === id);
      column.titleColumn = newValue;
      return newState
    });
  };

  const onDeleteColumn = id => {
    setNewColumnsList(prevState => prevState.filter(el => el.id !== id));
  }

  const onSubmit = type => {
    setBoardModalActive(false);
    if(type === 'edit') {
      dispatch(sliceBoards.actions.editBoard({ nameBoard, newColumnsList}))
    }
  }

  const validate = () => {
    setIsChecked(false);
    if(!nameBoard.trim()) {
      return false;
    }
    for(let i = 0; i < newColumnsList.length; i++) {
      if(!newColumnsList[i].titleColumn.trim()) {
        return false;
     }
    }
    setIsChecked(true)
    return true;
  }

  return (
    <div
    onClick={e => {
      if(e.target !== e.currentTarget) {
        return;
      }
      setBoardModalActive(false);
    }}
    className="absolute inset-0 p-4 overflow-scroll scrollbar-hide z-50 flex justify-center items-center bg-black-main bg-opacity-80">
      <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] bg-white-main dark:bg-gray-500 text-black-main dark:text-white-main font-semibold max-w-md m-auto w-full p-8 rounded-xl border border-gray-300 border-opacity-50">
        <h3 className="text-lg">
          Edit Board
        </h3>
        <div className="flex flex-col space-y-1 mt-8 gap-2">
          <label className="text-sm text-gray-400 dark:text-white-main">
          Board name
          </label>
          <input className="bg-transparent px-4 py-2 border-[0.5px] border-gray-300 focus:outline-orange-300 outline-1 ring-0 rounded-md text-sm dark:text-gray-500"
          type="text"
          placeholder="Enter the name of the board"
          value={nameBoard}
          onChange={e => setNameBoard(e.target.value)}
          id="name-board-input"
          />
        </div>
        {/* Columns Board */}
        <div className="flex flex-col space-y-3 mt-6">
          <label className="text-sm text-gray-400 dark:text-white-main">
            Board Columns
          </label>
          {newColumnsList.map((column, index) => (
            <div key={index} className="w-full flex items-center">
              <input
              onChange={e => {
                onChangeColumn(column.id, e.target.value);
              }}
              type="text"
              value={column.titleColumn || ""}
              className="bg-transparent px-4 py-2 border-[0.5px] border-gray-300 focus:outline-orange-300 outline-[1px] flex-grow rounded-md text-sm dark:text-gray-500"/>
              <img
              onClick={() => {
                onDeleteColumn(column.id)
              }}
              src={closeIcon}
              className="cursor-pointer m-2 mr-0"
              alt="board-icon" width="32" height="32"
              />
        </div>
      ))}
        <div>
          <button
          onClick={() => {
            setNewColumnsList(state => [
              ...state,
              { nameBoard: "", tasksList: [], id: uuidv4()}
            ]);
          }}
          className="w-full items-center py-2 rounded-full text-white-main hover:opacity-70 bg-orange-300 mt-3">
            + Add New Column
          </button>
          <button
          onClick={() => {
            const isChecked = validate();
            if(isChecked === true) onSubmit(type);
          }}
          className="w-full items-center mt-6 relative text-white-main py-2 rounded-full hover:opacity-70 bg-cyan-300"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default EditBoardModal