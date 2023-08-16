export const authenReducer = (state = [],action) => {
    switch (action.type) {
        case "AUTHEN":
            return action.isLogin;
    
        default:
            return state;
    }
};