import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './RootReducer';

export const store = createStore(rootReducer, compose(
  applyMiddleware(thunk),
  ((window as any).__REDUX_DEVTOOLS_EXTENSIONS_COMPOSE__ && (window as any).__REDUX_DEVTOOLS_EXTENSIONS__()) || compose
));

store.subscribe(() => {
  console.log(store.getState());
});
