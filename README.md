# Personal Budget and Expense Tracker with Currency Converter

# Description

The **Personal Budget and Expense Tracker** is a web-based tool that allows users to log, track, and categorize their expenses. It provides insights into spending patterns with dynamic charts and helps users keep their finances in check. Additionally, this tool includes a **Currency Converter**, enabling users to enter expenses in their preferred currency and view them in real-time converted amounts.

# Deployment Link: https://anushika06.github.io/Expense_Tracker/

## Key Features

- **Expense Logging & Management**: Users can log expenses by entering an amount and selecting a category. They can also edit or delete logged expenses.
  
- **Category Breakdown**: The tool categorizes expenses into four primary categories: Food, Travel, Education, and Other. Each category is color-coded for better visualization.

- **Charts for Insights**: Interactive **doughnut** and **bar charts** display a breakdown of the expenses by category and over time.

- **Currency Conversion**: The tool integrates with the **Open Exchange Rates API** to fetch real-time exchange rates and convert expenses into different currencies.

- **Local Storage Support**: All expenses are stored in the browser's local storage, ensuring data persistence even after page reloads.

## Technologies Used

- **HTML**: For building the structure of the web pages.
- **CSS**: For styling and responsiveness across devices.
- **JavaScript**: For implementing dynamic functionality, including handling user input, managing charts, and integrating APIs.
- **Chart.js**: Used for creating interactive charts to visualize expense data.
- **Bootstrap**: For responsive design, ensuring the app works well on various screen sizes.
- **Open Exchange Rates API**: For real-time currency conversion.
- **Local Storage API**: Used for storing and retrieving expense data, ensuring persistence across sessions.

## How It Works

1. **Log Expenses**: Users can add an expense with details such as amount, category, and currency.
   
2. **View Categories**: Expenses are categorized into predefined groups (Food, Travel, Education, Other). A doughnut chart visualizes the proportion of each category.

3. **View Date-wise Expenses**: The bar chart shows the user's expenses over time by date, making it easy to analyze spending trends.

4. **Currency Converter**: The app allows users to input expenses in their chosen currency. The total amount is converted to different currencies using the **Open Exchange Rates API**.


## Installation

To run this project locally:

1. Clone this repository:
   git clone https://github.com/Anushika06/Expense_Tracker.git

2. Open the project folder in your code editor.

3. Open `index.html` in your browser to start using the tracker.

## APIs Used

- **Open Exchange Rates API**: Fetches real-time currency exchange rates for conversion.
- **Local Storage API**: Stores and retrieves expense data for persistent tracking.

## How to Use

1. On the homepage, log an expense by entering the amount, selecting a category, and choosing the currency.
2. View your total expenses and the breakdown of each category on the **Statistics** page.
3. Use the **Expense History** page to see your logged expenses in a table format with the ability to edit or delete entries.
