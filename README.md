# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


# Movie Search Application

This project is a React application to search for movies, TV series, and episodes using the OMDb API by Kerem Mert Ada.

## Features
- Search movies by name, year, or type (movie, series, episode).
- Pagination to display 10 movies per page.
- Detailed movie view with title, poster, genre, and more, if the data are empty, the data type will return nothing.

## Technologies Used
- React with TypeScript
- SASS, CSS Modules for styling

## Key Points 
     <input
        type="text"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Year (e.g., 2020)"
      />
I used year like this because in the year search mode, it won't return correctly, i saw this issue. https://github.com/omdbapi/OMDb-API/issues/307

  const getPosterUrl = (imdbID: string, poster: string) => {
    return poster !== 'N/A' ?  poster : `http://img.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`;
  };
I used image return like this because in some links of the provided api for poster does not have the images and it returns nothing. 
## .env.local
**My env local file is like this, the api key and api url is given below.**
REACT_APP_API_KEY=70a8843
REACT_APP_API_URL=http://www.omdbapi.com/