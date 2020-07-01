import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import { Dispatch } from 'redux';
import { connect, MapDispatchToProps } from 'react-redux';
import {
  saveUsername as saveUsernameAction,
  saveUserMessage as saveUserMessagAction
} from './store/user/UserActions';
import { Link } from 'react-router-dom';
import './App.css';
import { IUser } from './store/user/UserTypes';
import { IAppState } from './store/RootReducer';

interface IAppOwnProps {
  username: string | undefined;
  userType: 'admin' | 'moderator' | 'user' | 'guest';
}

interface IAppDispatchToProps {
  saveUsername: (user: IUser) => void;
  saveUserMessage: (user: IUser) => void;
}

const AppUnconnected: FC<IAppDispatchToProps & IAppOwnProps> = ({
  userType,
  username,
  saveUsername,
  saveUserMessage
}): JSX.Element => {
  const [time, setTime] = useState<Date>(() => new Date(Date.now()));
  const [message, setMessage] = useState<string>('');

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>):void => {
    setMessage(event.target.value);
  };
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date(Date.now()));
    }, 1000);

    if (username) {
      saveUsername({ username, userMessage: undefined });
    }

    return () => {
      clearInterval(timer);
    }
  }, [username, saveUsername]);

  useEffect(() => {
    saveUserMessage({ username: undefined, userMessage: message });
  }, [message, saveUserMessage])

  return (
    <div className="App">
      <p>
        Hi, {username || 'Mysterious Entity' }, your user type is {username ? userType : 'irrelvant because I do not know you'}.
      </p>
      <p>
        {time.toUTCString()}
      </p>
      <input
        type="text"
        placeholder="Enter your message here"
        value={message}
        onChange={handleTextChange}
      />
      <p>
        Your message: {message || ''}
      </p>
      <Link
        to='/userlist'
      >
        User List
      </Link>
    </div>
  );
}

// store dispatch
const mapDispatchToProps: MapDispatchToProps<
  IAppDispatchToProps,
  IAppOwnProps
> = (dispatch: Dispatch, ownProps: IAppOwnProps): IAppDispatchToProps => ({
  saveUsername: (user: IUser) => {
    dispatch(saveUsernameAction(user));
  },

  saveUserMessage: (user: IUser) => {
    dispatch(saveUserMessagAction(user));
  }
});

export const App = connect<
  {},
  IAppDispatchToProps,
  IAppOwnProps,
  IAppState
>(null, mapDispatchToProps)(AppUnconnected);
