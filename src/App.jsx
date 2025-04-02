import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import { AuthProvider, AuthContext } from "./Context/AuthContext";
import SearchBar from "./components/SearchBar/SearchBar";
import NewsList from "./components/NewsList/NewsList";
import Pagination from "./components/Pagination/Pagination";
import ErrorMessage from "./components/Erorr/Erorr";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/Auth/Profile";
import "./index.css";

const API_KEY = "4537124f62164ef0b61a9d38f8975546"; // Use environment variable
const BASE_URL = "https://newsapi.org/v2";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = React.useContext(AuthContext);

  const fetchNews = async (searchQuery = query, page = currentPage) => {
    setLoading(true);
    setError(null);
    try {
      const endpoint =
        searchQuery === "latest"
          ? `${BASE_URL}/top-headlines?country=us&apiKey=${API_KEY}&page=${page}&pageSize=10`
          : `${BASE_URL}/everything?q=${encodeURIComponent(
              searchQuery
            )}&apiKey=${API_KEY}&page=${page}&pageSize=10`;

      const response = await axios.get(endpoint);
      if (response.data.status !== "ok") {
        throw new Error("Failed to fetch news");
      }
      console.log("Endpoint:", endpoint); // Log endpoint
      console.log("Total Results:", response.data.totalResults); // Log totalResults
      setArticles(response.data.articles);
      setTotalPages(Math.ceil(response.data.totalResults / 10));
    } catch (err) {
      setError(err.message);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNews();
    }
  }, [user, query, currentPage]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery || "latest");
    setCurrentPage(1);
    fetchNews(searchQuery || "latest", 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchNews(query, page);
  };

  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <>
                <h1>News App</h1>
                <SearchBar onSearch={handleSearch} />
                {error && <ErrorMessage message={error} />}
                <NewsList articles={articles} loading={loading} />
                {articles.length > 0 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
