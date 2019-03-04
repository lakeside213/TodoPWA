import { CREATE_TODO, FETCH_USER, CREATE_LIST } from "../consts/types";

export const addTodo = (taskName, notes, dueDate) => ({
  type: CREATE_TODO,
  taskName,
  notes,
  dueDate
});
export const createList = name => ({
  type: CREATE_LIST,
  name
});
export const fetchUser = () => ({
  type: FETCH_USER
});
