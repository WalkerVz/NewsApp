# NewsApp

**NewsApp** is a React-based web application that fetches and displays the latest news articles using the NewsAPI. The app allows users to search for news articles by keywords, view top headlines, and paginate through articles.

## Features

- **Search Functionality:** Allows users to search for news articles by keyword.
- **Pagination:** Navigate through pages of news articles.
- **Error Handling:** Displays appropriate error messages when news data cannot be fetched.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Technologies Used

- **React** - A JavaScript library for building user interfaces.
- **NewsAPI** - Provides access to news articles from various sources.
- **Axios** - A promise-based HTTP client for the browser and Node.js, used to fetch news data.
- **CSS** - Used to style the application.

## Project Setup

### Prerequisites

Before you can run the project locally, you need to have the following installed:

- [Node.js](https://nodejs.org/en/) - JavaScript runtime.
- [npm](https://www.npmjs.com/) - Node package manager (comes with Node.js).

### Getting Started

Follow these steps to get the app running locally on your machine:

1. **Clone the repository:**

   Open your terminal/command prompt and clone the repository:

   ```bash
   git clone https://github.com/WalkerVz/NewsApp.git
Install dependencies:

2. **Navigate to the project folder and install the necessary dependencies:**

Install dependencies:

Navigate to the project folder and install the necessary dependencies:
cd NewsApp
npm install

3. **Create a .env file:**

You need a NewsAPI key to access the data. You can get it by signing up at NewsAPI. Once you have your key, create a .env file in the root of your project and add the following:
REACT_APP_API_KEY=your_news_api_key
