import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from "../consts/types";
const initialState = {
  toast: {
    message: "",
    open: false
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_SNACKBAR: {
      return {
        ...state,
        toast: {
          message: action.message,
          open: true
        }
      };
    }

    case CLOSE_SNACKBAR: {
      return {
        ...state,
        toast: {
          message: "",
          open: false
        }
      };
    }
  }

  return state;
}
