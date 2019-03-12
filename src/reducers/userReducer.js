import {
  CREATE_LIST,
  CREATE_TODO,
  FETCH_USER,
  DELETE_TODO,
  UPDATE_TODO,
  TOGGLE_TODO
} from "../consts/types";

const INITIAL_STATE = { lists: [], todos: [], settings: {} };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER:
      return { ...state };
    case CREATE_LIST:
      return { ...state, lists: [...state.lists, action.name] };
    case CREATE_TODO:
      let index = state.todos.length;
      console.log(action);
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: index,
            taskName: action.taskName,
            dueDate: action.dueDate,
            list: action.list,
            notes: action.notes,
            completed: false,
            completedAt: ""
          }
        ]
      };
    case DELETE_TODO:
      const todosCopy = [...state.todos];
      const indexTodelete = todosCopy.findIndex(function(todo) {
        return todo.id === action.id;
      });
      return {
        ...state,
        todos: [
          ...todosCopy.slice(0, indexTodelete),
          ...todosCopy.slice(indexTodelete + 1)
        ]
      };

    case TOGGLE_TODO:
      const todos = [...state.todos];
      const indexTodo = todos.findIndex(function(todo) {
        return todo.id === action.id;
      });
      const toggledTodo = {
        ...todos[indexTodo],
        completed: !todos[indexTodo].completed,
        completedAt: Date.now()
      };
      return {
        ...state,
        todos: [
          ...todos.slice(0, indexTodo),
          toggledTodo,
          ...todos.slice(indexTodo + 1)
        ]
      };

    default:
      return state;
  }
}
