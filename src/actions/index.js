import { CREATE_TODO, FETCH_USER } from "../consts/types";

export const addTodo = (taskName, notes, dueDate, text) => ({
  type: CREATE_TODO,
  taskName,
  notes,
  dueDate,
  text
});
export const fetchUser = () => ({
  type: FETCH_USER
});
