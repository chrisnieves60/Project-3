"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchFeaturedLists } from "@/utils/data";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mt-6 text-black">
        Welcome to Our Task Manager
      </h1>
      <FeaturedLists />
    </div>
  );
}

const FeaturedLists = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedLists = await fetchFeaturedLists();
      setLists(fetchedLists);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold text-center mt-6 text-black">
        Latest Lists
      </h2>
      <div className="flex flex-wrap justify-around">
        {lists.map((list) => {
          console.log(list.Tasks.slice(0, 3)); // This will log the tasks of each list
          return (
            <Link
              href={`/user/${list.user_id}/list/${list.list_id}`}
              key={list.id}
            >
              <p className="block p-4 bg-gray-100 rounded-lg w-64 text-center mb-4 hover:bg-gray-200 cursor-pointer">
                <h3 className="font-semibold mb-2">{list.list_name}</h3>
                <ul className="text-left overflow-hidden text-gray-700">
                  {list.Tasks
                    ? list.Tasks.slice(0, 3).map((task) => (
                        <li
                          key={task.task_id}
                          className="text-gray-600 text-sm"
                        >
                          {task.task_name}
                        </li>
                      ))
                    : "No tasks available"}
                </ul>
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
