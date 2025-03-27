CALL OF QUIZ
This project is a fun and interactive quiz application that allows users to test their knowledge on various topics, including Harry Potter trivia. The app is designed using React and is structured with components to handle the quiz flow, question rendering, and user interactions. The quiz data is fetched from a separate backend server.

Features

Multiple Question Types: The quiz features various types of questions, including image-based and text-based questions.

Timer: A countdown timer to challenge users to answer questions quickly.

Status Bar: Displays the current progress in the quiz.

Result Page: Shows the user’s performance at the end of the quiz.

Project Structure
The project is structured as follows:


src
├── assets
│   └── react.svg               # Icon used in the app
├── components
│   ├── Footer.jsx              # Footer component
│   ├── Navbar.jsx              # Navbar component
│   ├── QuizForm.jsx            # Quiz form component
│   ├── QuizQuestionContainer.jsx # Container for rendering quiz questions
│   ├── QuizStatusBar.jsx       # Displays quiz status
│   └── QuizTimer.jsx           # Timer component
├── config
│   └── config.js               # Configuration file for app settings
├── pages
│   ├── AllQuizPage.jsx         # Page displaying all quizzes
│   ├── DetailsQuestionsPage.jsx # Page for detailed quiz questions
│   ├── FormQuestionsPage.jsx    # Page to display question forms
│   ├── HomePage.jsx            # Home page of the quiz app
│   ├── NotFoundPage.jsx        # Page for 404 errors
│   ├── QuestionsPage.jsx       # Page displaying current quiz questions
│   ├── QuizEndedPage.jsx       # Page shown when the quiz ends
│   └── QuizPage.jsx            # Main page for taking the quiz
├── context
│   ├── QuestionsContext.jsx    # Context for managing quiz questions
│   └── QuizContext.jsx         # Context for managing quiz state
├── css
│   └── App.css                 # Main styles for the app
├── images
│   └── PageNotFoundimg.avif    # Image for 404 page
├── img
│   └── Various images for quiz
└── App.jsx                     # Main entry point for the app
Installation
Clone the repository:

bash
Kopieren
git clone https://github.com/your-username/super-quiz.git
Install the dependencies:

bash
Kopieren
npm install
Make sure the backend server is running on localhost:4000 (refer to the backend repository for setup instructions).

Start the React development server:

BASH
npm start
Open the application in your browser at http://localhost:3000.

Backend Server (Database)
The quiz data is stored in a separate backend server. To fetch the questions and quiz data, you need to have the backend server running on localhost:4000.

The backend repo is hosted separately and can be cloned from:

BASH
git clone https://github.com/your-username/super-quiz-server.git
After cloning the backend, run:

BASH

npm install
npm start
The server will run on http://localhost:4000.

Technologies Used
React: For building the user interface.

CSS: For styling the app.

React Context API: For managing the quiz state across components.

Node.js: For the backend server.

Express: For the API to serve quiz data.