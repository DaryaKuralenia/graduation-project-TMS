import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthorInfo from "./components/Main/AuthorInfo/AuthorInfo";
import BookInfo from "./components/Main/BookInfo/BookInfo";
import SearchProvider from "./components/contexts/SearchContext";
import LogInPage from "./components/Pages/LogInPage/LogInPage";
import UserProvider from "./components/contexts/UserContext";
import RequireAuth from "./components/hoc/RequireAuth";
import MyBooks from "./components/Pages/MyBooks/MyBooks";
import BookEditions from "./components/Main/BookEditions/BookEditions";
import SearchResults from "./components/Pages/SearchResults/SearchResults";

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <SearchProvider>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/log-in" element={<LogInPage />} />
              <Route path="/search-results" element={<SearchResults />} />
              <Route path="/author/:id" element={<AuthorInfo />} />
              <Route path="/book-editions/:id" element={<BookEditions />} />
              <Route path="/books/:id" element={<BookInfo />} />
              <Route
                path="/my-books"
                element={
                  <RequireAuth>
                    <MyBooks />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </SearchProvider>
          <Footer />
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
