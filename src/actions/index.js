import {
  CREATE_TODO,
  FETCH_USER,
  CREATE_LIST,
  DELETE_LIST,
  TOGGLE_TODO,
  DELETE_TODO,
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR
} from "../consts/types";

export const createTodo = (taskName, notes, dueDate, list) => {
  return async function(dispatch) {
    dispatch({
      type: CREATE_TODO,
      taskName,
      notes,
      dueDate,
      list
    });
    dispatch(openSnackbar("Todo successfully added"));
  };
};

export const createList = name => {
  return async function(dispatch) {
    dispatch({
      type: CREATE_LIST,
      name
    });
    dispatch(openSnackbar("List successfully created"));
  };
};

export const deleteList = name => {
  return async function(dispatch) {
    dispatch({
      type: DELETE_LIST,
      name
    });
    dispatch(openSnackbar("List successfully deleted"));
  };
};

export const fetchUser = () => ({
  type: FETCH_USER
});

export const toggleTodo = id => {
  return async function(dispatch) {
    dispatch({
      type: TOGGLE_TODO,
      id
    });
  };
};
export const deleteTodo = id => {
  return async function(dispatch) {
    dispatch({
      type: DELETE_TODO,
      id
    });
    dispatch(openSnackbar("Todo successfully deleted"));
  };
};

export const openSnackbar = message => ({
  type: OPEN_SNACKBAR,
  message
});

export const closeSnackbar = () => ({
  type: CLOSE_SNACKBAR
});
