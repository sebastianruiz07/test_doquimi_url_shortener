# URL Shortener

URL Shortener is a web application built with Node.js and React.js that allows users to shorten long URLs, custom short URLs, protect them with passwords, and set expiration dates.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Environment Configuration](#environment-configuration)
- [Technologies](#technologies)
- [Improvements](#improvements)


## Installation

### Prerequisites

- Node.js (version 22.10.0)
- npm or yarn
- SQLite for the database

### Clone the repository

```bash
git clone https://github.com/sebastianruiz07/test_doquimi_url_shortener.git
cd your_repo
```

### Install the dependencies / Build the project

```bash
npm install

#You can also build the project and then the dependencies will be installed.
npm run build
```


## Usage

### Run the project

```bash
#This comand need to be executed in root folder
npm start
```
Go to "http://localhost:3001/" and try the app


## Features

- URL shortening: Convert long URLs into short links.
- Custom URLs: Allow the users to crete a custom URLs if it doesn't exist.
- Password protection: Assign passwords to shortened URLs to restrict access.
- Expiration dates: Set an expiration date for each shortened URL.
- URL validation: Ensure that the input URLs are valid.
- Automatic redirection: Redirect users from the shortened URL to the original URL.

## Environment Configuration

This project uses a .env file to manage environment variables. You must make sure that you are using the correct variables for each development environment.


## Technologies

### Backend:

- Node.js & Express: Node.js was chosen for the backend because it provides a fast and scalable solution for building REST APIs. Express, a minimalistic web framework for Node.js, allows for rapid setup and routing, making it an excellent choice for handling HTTP requests and responses in this URL shortener project.

- SQLite: SQLite was selected as the database for its simplicity and zero-configuration setup. Since the project is lightweight, SQLite is sufficient for storing shortened URLs, passwords, and expiration dates without requiring a full-fledged database management system.

- bcrypt: bcrypt is used for password hashing to securely store user passwords in the database. It provides a reliable and safe method for encrypting sensitive data, ensuring that passwords are not stored in plain text.

- nanoid: nanoid is a modern and fast library for generating unique, URL-safe IDs. It’s used to create shortened URLs that are both compact and collision-resistant.

### Frontend:
- React: React was chosen for the frontend due to its component-based architecture, which makes building dynamic user interfaces simple and efficient. It allows for fast rendering and the ability to handle state efficiently, which is crucial in an interactive web application like a URL shortener.

- Material-UI (MUI): Material-UI provides pre-styled, accessible components that follow Material Design principles, speeding up the UI development process. It was chosen to ensure a clean and modern design without having to write custom CSS for every component.

- react-router-dom: Used for navigation within the React app. It allows handling different routes, such as displaying password-protected URLs or expired URL errors, smoothly within the user interface.

### Development Tools:
- ES6+: ES6+ syntax was adopted for the entire codebase to leverage modern JavaScript features like arrow functions, async/await, and destructuring, resulting in cleaner and more readable code.

- dotenv: dotenv was selected to manage environment variables, allowing the project to seamlessly switch between development (localhost) and production environments by changing the configuration file.

- dayjs: A modern library for date manipulation. It provides simple APIs to handle and format dates, such as setting expiration dates for shortened URLs.


## Improvements

- User Accounts: Implement user authentication so that each user can create an account and log in to manage their URLs.

- URL History: Add a feature where users can view their shortened URL history, including details such as creation dates, expiration dates, and password protection.

- User Dashboard: Create a dashboard where users can manage their shortened URLs, allowing them to edit, delete, or view detailed analytics for each URL.

- URL Analytics: Provide statistics for each shortened URL, such as the number of clicks, geographic locations of visitors, and the devices used.

- Custom URL Expiration Alerts: Allow users to set alerts for when their URLs are about to expire, giving them an option to extend or renew the expiration date.