import { CREATE_TODO } from "../consts/types";

export const addTodo = (taskName, notes, dueDate, text) => ({
  type: CREATE_TODO,
  taskName,
  notes,
  dueDate,
  text
});
