import {
  IUser,
  UserActions,
  IUserActionTypes
} from './UserTypes';

const INTIAL_STATE: IUser = {
  username: undefined,
  userMessage: undefined,
  friendList: undefined
}

export function userReducer(prevState: IUser = INTIAL_STATE, action: IUserActionTypes) {
  switch (action.type) {
    case UserActions.SAVE_USERNAME:
      return {
        ...prevState,
        username: (action.payload as IUser).username
      }

    case UserActions.SAVE_USER_MESSAGE:
      return {
        ...prevState,
        userMessage: (action.payload as IUser).userMessage
      }

    case UserActions.SAVE_FRIENDS:
      return {
        ...prevState,
        friendList: action.payload as string[]
      }

    default:
      return prevState;
  }
}
