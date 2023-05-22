"use client";
import { getLists } from "@/utils/data";
import { useState, useEffect } from "react";
import Link from "next/link";

const Lists = ({ userId }) => {
  const [lists, setLists] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getLists();
      setLists(data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-5 flex flex-col min-h-screen">
      <div className="font-semibold text-lg mb-5">All Lists</div>
      {!lists ? (
        <div className="font-semibold text-lg">Loading...</div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-auto">
          {lists.map((list) => {
            return (
              <Link
                href={`/user/${list.user_id}/list/${list.list_id}`}
                key={list.list_id}
              >
                <p className="block p-4 bg-gray-100 rounded-lg shadow-lg transform transition hover:scale-105 overflow-hidden">
                  <h3 className="font-semibold text-center truncate">
                    {list.list_name}
                  </h3>
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Lists;
