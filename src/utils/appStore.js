import { configureStore } from "@reduxjs/toolkit";
import { use } from "react";
import userSlice from "./userSlice";

const appStore = configureStore({
    reducer: {user: userSlice},
});

export default appStore;