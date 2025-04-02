import React from "react";
import NewsCard from "../NewsCard/NewsCard";

function NewsList({ articles, loading }) {
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (articles.length === 0) {
    return <p>No news articles found</p>;
  }

  return (
    <div className="news-grid">
      {articles.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
    </div>
  );
}

export default NewsList;
