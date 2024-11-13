# Documentation for Running ll-client

## Description

`ll-client` is a frontend application built using React, Material-UI, and Tailwind CSS. It provides an interface for user registration, authentication, and displays user information and statistics.

## Requirements

- Node.js and npm (Node Package Manager)
- A server running on port 5433 (either `ll-server` or `mock-server`)

## Installation and Running

### Step 1: Install Node.js and npm

Ensure that you have Node.js and npm installed. You can check this by running the following commands in your terminal:

```sh
node -v
npm -v
```

If they are not installed, download and install them from [nodejs.org](https://nodejs.org/).

### Step 2: Clone the Repository

Clone the `ll-client` repository to your local machine:

```sh
git clone <URL of your repository>
cd ll-client
```

### Step 3: Install Dependencies

Install all necessary dependencies for the project:

```sh
npm install
```

### Step 4: Run mock-server (if ll-server is not available)

If you do not have `ll-server` running, you can use `mock-server` located in the `mock-server` folder.

Navigate to the `mock-server` folder and install dependencies:

```sh
cd mock-server
npm install
```

Start the `mock-server`:

```sh
npm start
```

### Step 5: Run ll-client

Navigate back to the root folder of `ll-client` and start the application:

```sh
cd ..
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

- `public/` - Contains static files such as `index.html`, `manifest.json`, and `robots.txt`.
- `src/` - Contains the source code of the application.
  - `components/` - Contains React components such as `Register`, `Login`, `Dashboard`, and `AccountSettingsForm`.
  - `services/` - Contains services for interacting with the API, such as `authService` and `userService`.
  - `App.js` - The main component of the application.
  - `index.js` - The entry point of the application.
  - `config.js` - Configuration file for API URLs.
  - `index.css` - Styles for the application.
- `mock-server/` - Contains files for running the mock server.
  - `server.js` - The main server file.
  - `package.json` - Dependency and script file for the mock server.

## Main Commands

### Install Dependencies

```sh
npm install
```

### Run the Application

```sh
npm start
```

### Run the Mock Server

```sh
cd mock-server
npm start
```

## Additional Information

### Libraries Used

- **React**: The main framework for building the user interface.
- **Material-UI**: A component library for React.
- **Tailwind CSS**: A utility-first CSS framework.
- **Axios**: An HTTP client for making requests to the server.
- **Formik**: A library for managing forms and validation.
- **Yup**: A schema validation library.

### Component Structure

- **Register**: Component for user registration.
- **Login**: Component for user authentication.
- **Dashboard**: Component for displaying user information and statistics.
- **AccountSettingsForm**: Form for updating user information.

### Services

- **authService**: Service for user registration and authentication.
- **userService**: Service for retrieving and updating user information.

## Conclusion

By following this documentation, you will be able to install and run `ll-client`, as well as use the mock server for testing the application's functionality. If you have any questions or issues, refer to the documentation of the libraries used or contact the project developers.
