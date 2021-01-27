

const initialState = {
    username: '',
    profilePicture: ''
}

const UPDATE_USER = 'UPDATE_USER'
const LOGOUT = 'LOGOUT'


export function updateUser(userObj){
    return {
        type: UPDATE_USER,
        payload: userObj
    }
}

export function logout(){
    return {
        type: LOGOUT,
        payload: {}
    }
}

export default function reducer(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case UPDATE_USER:
            return {...state, user: payload};
        case LOGOUT:
            return {...state, user: payload};
        default:
            return state;
    }
}