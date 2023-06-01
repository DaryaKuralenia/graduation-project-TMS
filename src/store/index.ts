import { createStore } from "redux";
import { bookmarksReducer } from "./bookmarksReducer";

export const store = createStore(bookmarksReducer);
