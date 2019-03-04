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
      break;
    case CREATE_LIST:
      return { ...state, lists: [...state.lists, action.name] };
    case CREATE_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            taskName: action.taskName,
            dueDate: action.dueDate,
            list: action.list,
            notes: action.notes,
            completed: false,
            completedAt: ""
          }
        ]
      };
    default:
      return state;
  }
}
