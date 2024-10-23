# Laptop Price Comparer

## Overview

**Laptop Price Comparer** is a web application that allows users to compare laptop prices across multiple e-commerce websites. It uses **Scrapy** and **Scrapy Playwright** integration to scrape data from different sites, and displays the information on a React-powered frontend. The scraped data is stored in a **MongoDB** database for efficient querying and future use.

## Features

- **Price Comparison**: Compares prices of laptops from multiple e-commerce platforms.
- **Automated Web Scraping**: Uses Scrapy along with Playwright to handle dynamic content scraping and data extraction from various websites.
- **Frontend in React**: A clean and interactive user interface built with React for easy comparison of laptops.
- **Data Storage**: Scraped data is stored in MongoDB, allowing efficient searches and queries.
- **Regular Updates**: Data is periodically updated by re-running the scrapers to ensure up-to-date pricing information.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Python (Scrapy and Playwright)
- **Web Scraping**: Scrapy, Scrapy Playwright (for handling dynamic websites)
- **Database**: MongoDB (for storing and retrieving laptop data)
