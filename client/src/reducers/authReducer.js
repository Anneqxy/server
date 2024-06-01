import { FETCH_USER } from "../actions/types";

// Name the function authReducer
const authReducer = (state = null, action) => {
    switch(action.type) {
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
};

// Export the named function
export default authReducer;