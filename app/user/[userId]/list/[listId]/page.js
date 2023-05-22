"use client";

import List from "@/Components/List";
import { usePathname } from "next/navigation";
import { getCurrentUser } from "@/utils/data";
import { useState, useEffect } from "react";
const Page = () => {
  const pathname = usePathname();
  const userId = pathname.split("/")[2]; // Assuming /user/{userId}/list/{listId} format
  const listId = pathname.split("/")[4];
  const [isOwner, setIsOwner] = useState(false);
  //const [user, setUser] = useState();
  //const [error, setError] = useState();

  useEffect(() => {
    const currentUser = async () => {
      const user = await getCurrentUser();
      if (!user.success) {
        setError(user.error);
        return;
      }

      if (!user.data) {
        setUser(null);
        return;
      }
      if (userId == user.data.id) {
        setIsOwner(true); // Update the login status
      }
    };
    currentUser();
  }, []);

  console.log(isOwner);

  return <List userId={userId} listId={listId} isOwner={isOwner} />;
};

export default Page;
