## Game Logo

<img src="https://github.com/ecek01/men-stack-crud-app-project/blob/main/libraryapp.png?raw=true" width="500">

# Library App - MEN Stack Crud App Project

## **Description**

<p>This project is a web application for a personal library, allowing users to manage their book collection. Users can add, view, edit, and delete books from their library, as well as track reading progress, set reading goals, and assign ratings to completed books. The app was created as part of a coding bootcamp project to demonstrate skills in Node.js, Express, MongoDB, HTML, CSS, and JavaScript.</p>

## **Github Repo**

<p><a href="https://github.com/ecek01/men-stack-crud-app-project">MEN Stack Crud App GitHub Repository</a></p>

## **Deployment Link**

## **Timeframe & Working Team**

- **Timeframe**: 2 weeks
- **Team**: Solo project

## **Technologies Used**

- **Back End**: Node.js, Express, MongoDB
- **Front End**: HTML, CSS, JavaScript, EJS
- **Tools**: Git, GitHub, MongoDB Atlas, Postman

## **Brief**

<p>Develop a full-stack application that allows users to manage their personal library. Users should be able to create an account, log in, and add books with details such as title, author, genre, status, and cover image. The application should allow users to update their reading progress, rate completed books, and delete books from their library</p>

## **Planning**

- Initial wireframes were created to outline the layout of key pages: Home, Library, Add Book, and Edit Book.
- User stories and application flow were mapped out to define core functionalities.
- Backend architecture was designed using ER diagrams to structure the MongoDB database.
- [Project planning material](https://trello.com/b/8AVtk8ZL/men-stack-crud-app-project)

## **Build/Code Process**


Front-End Design: Built out each page using HTML, CSS, and EJS templates, focusing on creating a user-friendly and responsive interface.
Progress Tracking: Implemented functionality to track reading progress by capturing currentPage and totalPages, and dynamically display progress.
Error Handling & Validation: Included input validation for required fields and error handling for seamless user experience.

1. **Database Setup**: Established a MongoDB database with collections for users and books. Designed the schema to store book details, user-specific data, and reading progress.

2. **Server & Routes**: Set up the server with Node.js and Express. Created routes for handling user actions like viewing, adding, editing, and deleting books.

3. **Authentication**: Implemented user authentication using Express sessions to allow personalised libraries for each user.

4. **Front-End Design**: Built out each page using HTML, CSS, and EJS templates, focusing on creating a user-friendly and responsive interface.

5. **Progress Tracking**: Implemented functionality to track reading progress by capturing currentPage and totalPages, and dynamically display progress.

6. **Error Handling & Validation**: Included input validation for required fields and error handling for seamless user experience.


## **Attributions**

- [Roboto Font](https://fonts.google.com/specimen/Roboto) from Google Fonts.
- Background images used under fair use for aesthetic purposes

## **Challenges**

<p>Integrating CRUD operations to work smoothly with the database and creating a user-friendly interface for editing book details without reloading the page. Managing state and error handling during form submissions for a better user experience.</p>

## **Wins**

<p>Successfully implemented full CRUD functionality with intuitive user navigation. Developed a seamless progress tracker for books in the "Reading" status, enhancing user engagement. Implemented a clean and responsive UI that scales well on different devices.</p>

## **Key Learnings/Takeaways**

<p>Gained proficiency in working with MongoDB and Express for full-stack applications. Enhanced skills in managing user-specific data and learned how to efficiently handle sessions in Node.js for personalized experiences. Improved ability to structure full-stack applications and manage database schemas effectively.</p>

## **Bugs**

<p>Occasionally, the reading progress does not update if the user fails to input both `currentPage` and `totalPages`. To address this, we’re adding validation to ensure all progress-related fields are completed.</p>

## **Future Improvements**

<ul>
  <li>Make it more visually appealing for the user. Adding components like stars for the rating system.</li>
  <li>An online function, to connect with other users on the app.</li>
  <li>Improve mobile responsiveness.</li>
</ul>

