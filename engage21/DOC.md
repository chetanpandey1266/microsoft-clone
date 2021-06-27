# Microsoft Clone 

## Tech Stack Used 
- React, simple peer: for frontend
- express, socket.io : for backend
- mongodb-atlas, mongoose: for database

## How I planned the project 

Coming Soon😅

## How I implmented the frontend part 

I had mainly three components: 
- MainPage: This makes up the landing page of the site. It is basically made up of three subcomponents, i.e., `header`, `landing page` and `footer`. 
- Login/Signup: For login/signup feature, I have made multipage form. 
- User.js: User component comprises is made up of three subcomponents, i.e., `UserNavbar`, `UserSidebar`, `UserMain`. `UserMain` is a container that contains, `UserMainChat`, `UserMainTeam` and `UserMainCalendar`. Each one of them appears on the basis of what  is selected on the sidebar.

## How I implemented the backend part 

The backend folder contains a `server.js` and `routes/user.js` file. Schema for mongoose is defined in `Schema` folder. 

`server.js`: This is the main backend file which contains code for creating server, connecting database and making socket connection. Routes such as `/`, `/signup01`, `/signup02`, `/signin01`, `signin02` are defined within it.

The funtions of each routes:
    
- `/`: just sends a `200` response.
- `/signup01`: This takes in the username and email from the fronten and checks whether a user with same email exists or not. In case a user with same email is found it returns `400` error. Otherwise it redirects to the second page `/signup02`. On redirection, the username and email is passed as query string to the next page.
- `/signup02`: This accepts password from the form and takes username and email from the query string. Then the password is hashed using `bcrypt` and finally saved to the database. The database contains a `generateAuthToken` method which takes in `_id` and returns jwttoken for the user. This jwttoken is passed on as query string to the `/user` page.
- `/signin01`: This accepts user email and checks whether the provided email is present in the database or not. If user is present then it continues to the next page `/signin02` else it returns `404` error.
- `/signin02`: It takes in email from querystring and password from the form. This password is compared against the one in the database. If the password matches, a jwt token is generated (same as in `/signup02`) and passed on to the frontend as querystring.

After signup/signin, the jwt passed onto the frontend as querystring is saved in the localStorage. On signup/signin only, the websocket connection is made and socket id is saved in the localStorage. All this happens  once the user is signin/signup. This ensures that the socket connection that is established once remains until the user is signed. As I have not designed signout button till now, so everytime a newuser signups, the localStorage is cleared inorder to save token and socketid of the new user.  


NOTE: There are some incomplete codes in `microsoft-frontend/src/components/User/UserMain/UserMainTeam.js` which I am working on. But they don't affect the app in anyway. 