import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { todosSlice } from '../features/todosSlice';

const rootReducer = combineSlices({
  todos: todosSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
