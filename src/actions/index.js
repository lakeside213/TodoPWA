import {
  CREATE_TODO,
  FETCH_USER,
  CREATE_LIST,
  TOGGLE_TODO
} from "../consts/types";

export const createTodo = (taskName, notes, dueDate, list) => ({
  type: CREATE_TODO,
  taskName,
  notes,
  dueDate,
  list
});
export const createList = name => ({
  type: CREATE_LIST,
  name
});
export const fetchUser = () => ({
  type: FETCH_USER
});
export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id
});
