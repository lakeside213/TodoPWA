import {
  CREATE_LIST,
  DELETE_LIST,
  CREATE_TODO,
  FETCH_USER,
  DELETE_TODO,
  UPDATE_TODO,
  TOGGLE_TODO,
  MONITOR_TODOS
} from "../consts/types";
import { createNotification } from "../Notifications";
import Moment from "moment";
import { store } from "../store";

function isSameDayAndMonth(m1, m2) {
  return m1.date() === m2.date() && m1.month() === m2.month();
}
const INITIAL_STATE = { lists: [], todos: [], settings: {} };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER:
      return { ...state };
    // case MONITOR_TODOS:
    //   state.todos.map(todo => {
    //     if (
    //       isSameDayAndMonth(Moment(Date.now()), Moment(todo.dueDate)) &&
    //       todo.notified === false &&
    //       todo.completed === false
    //     ) {
    //       let notificationTitle = `${todo.taskName} is due today`;
    //       let notificationBody = todo.notes;
    //       todo.notified = true;
    //       createNotification(notificationTitle, notificationBody);
    //     }
    //   });
    //   return state;
    case MONITOR_TODOS:
      return Object.assign({}, state, {
        todos: state.todos.map(todo => {
          if (
            isSameDayAndMonth(Moment(Date.now()), Moment(todo.dueDate)) &&
            todo.notified === false &&
            todo.completed === false
          ) {
            let notificationTitle = `${todo.list}`;
            let notificationBody = `${todo.taskName} is due today`;
            createNotification(notificationTitle, notificationBody);
            return Object.assign({}, todo, {
              notified: true
            });
          }
          return todo;
        })
      });
    case CREATE_LIST:
      return { ...state, lists: [...state.lists, action.name] };
    case DELETE_LIST:
      const listsCopy = [...state.lists];
      const allTodos = [...state.todos];

      const filteredTodos = allTodos.filter(todo => todo.list !== action.name);
      const indexdelete = listsCopy.findIndex(function(list) {
        return list === action.name;
      });
      return {
        ...state,
        lists: [
          ...listsCopy.slice(0, indexdelete),
          ...listsCopy.slice(indexdelete + 1)
        ],
        todos: [...filteredTodos]
      };

    case CREATE_TODO:
      let index = state.todos.length;
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
            completedAt: "",
            notified: false
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

setInterval(function() {
  store.dispatch({
    type: MONITOR_TODOS
  });
}, 5000);
