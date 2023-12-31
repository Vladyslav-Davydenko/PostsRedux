import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import store from "./helpers/store.ts";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { extendedApiSlice } from "./helpers/posts/PostsSlice.ts";
import { extendedApiUserSlice } from "./helpers/users/UsersSlice.ts";

store.dispatch(extendedApiUserSlice.endpoints.getUsers.initiate());
store.dispatch(extendedApiSlice.endpoints.getPosts.initiate());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
