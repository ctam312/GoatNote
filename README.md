# About Goatnote:
<img width="1248" alt="Screenshot 2023-03-03 at 10 11 16 AM" src="https://user-images.githubusercontent.com/90665180/222756003-c7e9e8ec-3ae5-48fe-9beb-8e459566465d.png">


Introducing Goatnote, a full-stack Evernote clone, your go-to online note taking app that auto saves and organizes your notes from mountain goats to goats like Michael Jordan. View and organize all of your notes in one place. Welcome to Goatnote, let's take note! [Click here to view Goatnote Live Site](https://goatnote.onrender.com/)

### Please see below links to project Wiki:
* [Feature List](https://github.com/ctam312/GoatNote/wiki/Feature-List)
* [User Stories](https://github.com/ctam312/GoatNote/wiki/User-Stories)
* [Wireframe Concept](https://github.com/ctam312/GoatNote/wiki/WireFrames)
* [Database Schema](https://github.com/ctam312/GoatNote/wiki/DB-Schema)

### This project is built with:
* Frontend: JavaScript, React/Redux
* Backend: Python, Flask
* Database: PostgreSQL, SQLAlchemy

### This project is built with fun by:
* [Christian Tam](https://www.linkedin.com/in/ctam312/)

# Getting Started:
1. Download the starter by cloning this repo.
   ```bash
   git clone https://github.com/ctam312/GoatNote.git
   ```
2. Install dependencies
   ```bash
   pipenv install -r requirements.txt
   ```
3. Create a **.env** file based on the example with proper settings for your
   development environment
   ```bash
   SECRET_KEY=<your secret key>
   DATABASE_URL=sqlite:///dev.db
   SCHEMA=flask_schema
   ```
4. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   flask db upgrade
   flask seed all
   flask run
   ```
5. Start frontend server in `react-app` directory
   ```bash
   npm install
   npm start
   ```
6. In your browser go to `localhost:3000`

# Features Directions:

### Feel free to view images below on all the features that were implemented on this project! These all follow the four basic CRUD functions.

## Home Page Demo User/Log in:

To test all features please click on the "Login as Demo User" button or feel free to sign up!

<img width="1281" alt="Screenshot 2023-03-03 at 10 16 15 AM" src="https://user-images.githubusercontent.com/90665180/222757120-1cb7fd85-7e03-4a5f-a838-30ccc2156eb8.png">

## Sign Up:
<img width="1298" alt="Screenshot 2023-03-03 at 10 17 25 AM" src="https://user-images.githubusercontent.com/90665180/222757389-6073ac8a-73b1-4374-b328-6ef76c5df312.png">


## View your notes on the home page:
<img width="1300" alt="Screenshot 2023-03-03 at 10 17 53 AM" src="https://user-images.githubusercontent.com/90665180/222757570-5914b12b-b179-4646-ac31-af024a0f0597.png">

## Create and view a note:

With live editing and auto saving you can click on the title or the content box itself and take note away! (Hosting on render does have some lag time when making edits when typing speed is above 70WPM)
<img width="1284" alt="Screenshot 2023-03-03 at 10 19 36 AM" src="https://user-images.githubusercontent.com/90665180/222757985-fdc2156e-5191-45ae-b037-01e0b3fa0c85.png">

## Delete a note:
<img width="1255" alt="Screenshot 2023-03-03 at 10 20 00 AM" src="https://user-images.githubusercontent.com/90665180/222758102-04635a0a-592f-45dd-b74d-14e124447a55.png">


## Read/Create/Edit/Delete notebooks:

You can organize your notes within notebooks you create with the selector option with the note itself!

<img width="1199" alt="Screenshot 2023-03-03 at 10 20 31 AM" src="https://user-images.githubusercontent.com/90665180/222758227-c2809b59-72ee-48a9-94a2-27d1d391b389.png">

## Bonus Feature: Lost Goat! (404 page):
![404page](https://user-images.githubusercontent.com/90665180/222761227-6e014923-186c-4718-9405-a197901895c2.gif)


