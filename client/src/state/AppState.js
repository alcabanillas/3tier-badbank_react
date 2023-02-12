import React, {useReducer, createContext} from "react";
//Context and Provider
export const UsersContext = createContext();

const actions = {
  ADD_USER: "ADD_USER",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  UPDATE_USERS: "UPDATE_USERS",
  SET_ERROR: "SET_ERROR"
};

const initialState = {
  currentUser: null
}

function reducer(state, action) {
  switch (action.type) {
    case actions.LOGIN:
      return { ...state, 
        currentUser: action.payload };
    case actions.LOGOUT:
      return { ...state, 
        currentUser: null };
    case actions.UPDATE_USERS:
      return {...state, users: action.payload}
    default:
      throw new Error();
  }
}

const useActions = (state, dispatch) => {
  const addUser = (userInfo) => {
    return new Promise( (resolve, reject) =>
      fetch(`/account/create/${userInfo.name}/${userInfo.email}/${userInfo.password}`)
        .then( (res) => {
          if (!res.ok) {
            reject(res.text())
          } else {
            res.json().then( (data) => {
              dispatch({ type: actions.UPDATE_USERS, payload: [...state.users, data] });
              resolve(data)
            })
          }
      })
      .catch( (err) => {
          reject("ha fallado...", err)
      })
    )
  }

  const login = (credentials) => {
    dispatch({ type: actions.LOGIN, payload: credentials })
    return { result : true};
  }

  const logout = () => {
    dispatch({ type: actions.LOGOUT})
    return true;
  }

  const deposit = (amount) => {
    let newUsers = state.users.map( element => {
      if (element.email === state.currentUser) {
        element.balance = Math.round(((element.balance + amount) + Number.EPSILON) * 100) / 100
      }
      return element;
    })
    dispatch({ type: actions.UPDATE_USERS, payload: newUsers })
    return {result : true};
  }

  const withDraw = (amount) => {
    let currentUser = state.users.find( elem => elem.email === state.currentUser)

    if (currentUser.balance < amount) {
      return {result : false, errorMessage: 'Not enough funds'}
    }

    let newUsers = state.users.map( element => {
      if (element.email === state.currentUser) {
        element.balance = Math.round(((element.balance - amount) + Number.EPSILON) * 100) / 100
      }
      return element;
    })
    dispatch({ type: actions.UPDATE_USERS, payload: newUsers })

    return {result : true};
  }

  return {
    addUser,
    login,
    logout,
    withDraw,
    deposit
  }

}

export const ContextProvider = (props) => {
  const [usersState, dispatch] = useReducer(reducer, initialState);
  const actions = useActions(usersState, dispatch);
  const value = { usersState, actions };

  return (
    <UsersContext.Provider value={value}>
      {props.children}
    </UsersContext.Provider>
  );
};