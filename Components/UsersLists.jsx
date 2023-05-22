import { getUsersLists, createList } from "@/utils/data";
import { useState, useEffect } from "react";
import Link from "next/link";

const UserLists = ({ userId }) => {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsersLists(userId);
      setLists(data);
    };
    fetchData();
  }, [lists]);

  const handleNewListNameChange = (event) => {
    setNewListName(event.target.value);
  };

  const handleCreateList = async () => {
    const newListData = await createList(userId, newListName);

    setNewListName("");
    setShowAlert(true);
    setShowInput(false);
    setTimeout(() => setShowAlert(false), 2000);
    const updatedLists = await getUsersLists(userId);
    setLists(updatedLists);
  };

  return (
    <div className="px-6 py-4">
      <h2 className="text-xl font-bold text-center mb-6">Your Lists</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {!lists ? (
          <div>Loading...</div>
        ) : (
          lists.map((list) => (
            <Link
              href={`/user/${list.user_id}/list/${list.list_id}`}
              key={list.list_id}
            >
              <p className="block p-6 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-150 ease-in-out">
                {list.list_name}
              </p>
            </Link>
          ))
        )}
      </div>
      {showAlert && (
        <p className="text-center mt-4 text-blue-950">List created!</p>
      )}
      {showInput ? (
        <div className="mt-6">
          <input
            type="text"
            value={newListName}
            onChange={handleNewListNameChange}
            placeholder="New list name"
            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-950 transition-colors duration-150 ease-in-out"
          />
          <button
            onClick={handleCreateList}
            className="w-full mt-2 p-2 text-white bg-blue-950 rounded-lg hover:bg-blue-800 transition-colors duration-150 ease-in-out"
          >
            Create list
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowInput(true)}
          className="w-full mt-2 p-2 text-white bg-blue-950 rounded-lg hover:bg-blue-800 transition-colors duration-150 ease-in-out"
        >
          New List
        </button>
      )}
    </div>
  );
};

export default UserLists;
