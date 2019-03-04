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
      return { ...state, lists: [action.payload.name] };
    case CREATE_TODO:
      return {
        ...state,
        todos: [
          {
            taskName: action.payload.taskName,
            dueDate: action.payload.dueDate,
            list: action.payload.list,
            notes: action.payload.notes,
            completed: false
          }
        ]
      };
    default:
      return state;
  }
}
