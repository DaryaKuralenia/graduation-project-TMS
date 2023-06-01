export type IBookInfo = {
  authors?: Array<{}>;
  cover?: {};
  number_of_pages?: number;
  publish_date?: string;
  publish_places?: [];
  publishers?: Array<{}>;
  title?: string;
  excerpts?: Array<{}>;
  key: string;
};

export interface IbookmarksState {
  bookmarks: IBookInfo[];
}

const ADD_BOOKMARK = "ADD_BOOKMARK";
const REMOVE_BOOKMARK = "REMOVE_BOOKMARK";

type AddBookmarkActionPayloadType = {
  cover?: {};
  title?: string;
  key: string;
};

type AddBookmarkActionType = {
  type: typeof ADD_BOOKMARK;
  payload: AddBookmarkActionPayloadType;
};

type RemoveBookmarkActionPayloadType = {
  key: string;
};

type RemoveBookmarkActionType = {
  type: typeof REMOVE_BOOKMARK;
  payload: RemoveBookmarkActionPayloadType;
};

const initialState: IbookmarksState = {
  bookmarks: [],
};

export const bookmarksReducer = (
  state = initialState,
  action: any
): IbookmarksState => {
  const bookKey = action.payload;

  switch (action.type) {
    case ADD_BOOKMARK:
      return {
        ...state,
        bookmarks: [...state.bookmarks, bookKey],
      };
    case REMOVE_BOOKMARK:
      return {
        ...state,
        bookmarks: state.bookmarks.filter((el) => el !== bookKey),
      };

    default:
      return state;
  }
};
