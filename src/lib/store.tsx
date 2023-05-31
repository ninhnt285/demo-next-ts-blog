import React, {Reducer, createContext, useContext, useEffect, useReducer} from 'react';
import {User} from '@/@types/user';
import {useRequest} from './request';

interface State {
  user: User | null;
  users: User[];
  error: any;
  isFetching: boolean;
}

interface Action {
  type: string;
  payload: any;
}

const storeReducer: Reducer<State, Action> = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isFetching: false,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isFetching: false,
      };

    case 'SET_FETCHING':
      return {
        ...state,
        isFetching: action.payload,
      }

    default:
      return state;
  }
};

const initialState: State = {
  user: null,
  users: [],
  error: null,
  isFetching: true,
};

const StoreContext = createContext(initialState);
const StoreDispatchContext = createContext((_action: Action) => {});

export function useStore() {
  return useContext(StoreContext);
}

export function useDispatch() {
  return useContext(StoreDispatchContext);
}

const Store = ({children}: any) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const fetcher = useRequest();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await fetcher("/user");
        if (responseData) {
          dispatch({type: 'SET_USER', payload: responseData});
        } else {
          dispatch({type: 'LOGOUT', payload: null});
        }
      } catch (err) {
        // console.log(err)
        dispatch({type: 'SET_FETCHING', payload: false});
      }
    }

    fetchUser();
  }, []);

  return (
    <StoreContext.Provider value={state}>
      <StoreDispatchContext.Provider value={dispatch}>
        {children}
      </StoreDispatchContext.Provider>
    </StoreContext.Provider>
  );
};

export default Store;