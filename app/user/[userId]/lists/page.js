"use client";
// pages/[userId]/lists/page.js
import UserLists from "@/Components/UsersLists";
import { usePathname } from "next/navigation";

const UserListsPage = () => {
  const pathname = usePathname();
  const userId = pathname.split("/")[2]; // Assuming /user/{userId}/list/{listId} format

  return (
    <div>
      <UserLists userId={userId} />
      <style jsx>{`
        div {
          color: black;
        }
      `}</style>
    </div>
  );
};

export default UserListsPage;
