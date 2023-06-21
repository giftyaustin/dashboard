import {createStore} from "redux"
const reducer =(state={}, action)=>{
    switch (action.type) {
        case "loggedIn":
            return {...state, name:action.payload.name, fullName:action.payload.fullName, picture:action.payload.picture, email:action.payload.email}
            break;
    
        default:
            break;
    }
return state;
}
export const store = createStore(reducer)

