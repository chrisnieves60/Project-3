import supabase from "./supabase.js";

const registerUser = async (email, password) => {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });
  console.log("user:", user);
  console.log("error:", error);
  if (error) {
    throw error;
  }
  return user;
};

const loginUser = async (email, password) => {
  const authResponse = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (authResponse.error) {
    return {
      success: false,
      error: authResponse.error,
    };
  }

  if (authResponse.data.user) {
    return {
      ...authResponse,
      message: "Successfully logged in, please wait to be redirected",
      success: true,
    };
  }
};

const getLists = async () => {
  const { data, error } = await supabase.from("Lists").select("*");

  if (error) {
    console.error("Error fetching lists", error);
    return null;
  }
  return data;
};

const getTasksForList = async (listId) => {
  const { data, error } = await supabase
    .from("Tasks")
    .select("*")
    .eq("list_id", listId)
    .order("order", { ascending: true });
  if (error) throw error;
  return data;
};
const updateTaskOrder = async (taskId, newOrder) => {
  const { data, error } = await supabase
    .from("Tasks")
    .update({ order: newOrder })
    .eq("task_id", taskId);

  if (error) throw error;
  return data;
};

const getCurrentUser = async () => {
  // grab the session from supabase (which handles all authentication)
  const { data, error } = await supabase.auth.getSession();

  if (data?.session?.user) {
    if (error) {
      return {
        success: false,
        error,
      };
    }

    const user = {
      ...data.session.user,
    };

    return {
      success: true,
      data: user,
    };
  }

  return {
    success: true,
    data: null,
  };
};

const logout = async () => {
  const { error } = await supabase.auth.signOut();
  return { success: !error, error };
};

const getUsersLists = async (userId) => {
  const { data, error } = await supabase
    .from("Lists")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    console.error("Error fetching lists", error);
    return null;
  }
  return data;
};
const createList = async (userId, listName) => {
  const { data, error } = await supabase
    .from("Lists")
    .insert([{ user_id: userId, list_name: listName }]);
  if (error) {
    console.error("Error creating list", error);
    return null;
  }

  return data;
};
const createTask = async (listId, taskName) => {
  // First, get the highest order value from the existing tasks
  const { data: existingTasks, error: fetchError } = await supabase
    .from("Tasks")
    .select("order")
    .eq("list_id", listId)
    .order("order", { ascending: false })
    .limit(1);

  if (fetchError) {
    console.error("Error fetching tasks for order", fetchError);
    return null;
  }

  // Calculate the next order value (if no tasks exist yet, start with 1)
  const nextOrder = existingTasks.length > 0 ? existingTasks[0].order + 1 : 1;

  // Then, insert the new task
  const { data, error } = await supabase
    .from("Tasks")
    .insert([
      { list_id: listId, task_name: taskName, status: false, order: nextOrder },
    ]);

  if (error) {
    console.error("Error creating task", error);
    return null;
  }

  return data;
};

const updateTaskStatus = async (taskId, newStatus) => {
  const { data, error } = await supabase
    .from("Tasks")
    .update({ status: newStatus })
    .eq("task_id", taskId);

  if (data && data.length > 0) {
    return data[0];
  } else {
    return null;
  }
};

const editTask = async (taskId, newTaskName) => {
  const { data, error } = await supabase
    .from("Tasks")
    .update({ task_name: newTaskName })
    .eq("task_id", taskId)
    .single(); // Add .single() to retrieve only one row

  if (error) {
    console.error("Error updating Task", error);
    return null;
  }
  return data;
};

const fetchFeaturedLists = async () => {
  const { data: lists, error } = await supabase
    .from("Lists")
    .select("*, Tasks (*)") // retrieves all tasks related to each list
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }

  return lists || [];
};

const deleteTask = async (taskId) => {
  const { data, error } = await supabase
  .from("Tasks")
  .delete()
  .eq("task_id", taskId)
  if (error) {
    console.error("Error deleting Task", error);
    return null;
  }
  return data;
}


export {
  registerUser,
  loginUser,
  getLists,
  getTasksForList,
  getCurrentUser,
  logout,
  getUsersLists,
  createList,
  createTask,
  updateTaskStatus,
  editTask,
  fetchFeaturedLists,
  updateTaskOrder,
  deleteTask,
};
