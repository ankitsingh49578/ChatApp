import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user/userSlice";
import messageReducer from "./slice/message/messageSlice";
import socketReducer from "./slice/socket/socketSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
    socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["socketReducer.socket"], // Ignore socket state for serialization/deserialization
      },
    }),
});
