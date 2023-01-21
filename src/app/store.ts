import { configureStore} from '@reduxjs/toolkit';
import emailReducer from "../features/email/emailsSlice";

export const store = configureStore({
  reducer: {
    email : emailReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

