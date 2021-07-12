# Index:

1. Introduction
2. Installation
3. Folder Structure
4. Description of each routes
5. Details on Chat feature
6. Deatils on Team feature

## Introduction

## Installation

Clone this repository

```shell
git clone https://github.com/chetanpandey1266/microsoft-clone.git
```

Move to the repository's root folder

```shell
cd microsoft-clone
```

### For running the react app

```shell
cd microsoft-frontend
npm install
npm start
```

### For running the express app

Open the `config/defualt.json` file and fill in all the configuration details

Note: Switch on [Less Secure App](https://accounts.google.com/signin/v2/challenge/pwd?continue=https%3A%2F%2Fmyaccount.google.com%2Flesssecureapps&service=accountsettings&osid=1&rart=ANgoxcdbq_k-DdEfD8NowR_H2bUXewvuFAFrbZQUj4FzcLbco89A9pfFUk0Hq0qJqSxCxKxFhodvlg2a-PbEbGOYtS-fNe8WYw&TL=AM3QAYZUHLr8-GRHwbAzraWjtYwa7Yk2xGUDGE-hB_RDq4UWvFPgc9LoOKrByFWZ&flowName=GlifWebSignIn&cid=1&flowEntry=ServiceLogin) for the above email.

```shell
npm install
npm start
```

## Folder Structure:

### 1. React app

All the files/folders under `/microsoft-frontend`, contains the reactjs code.

There are three folders under `/microsoft-frontend/src`:

1. **components**: contain all the components defined in the app. It contains three more folders:
   a. **Loginup**: Contain components used for signin/signup page.
   b. **MainPage**: Contain components that define the landing page of the app
   c. **User**: Contain components that define the user page.

2. **images**: contains all the images used in the app

3. **styles**: contains all the css files.

### 2. Express app

The root folder contains all the backend files/folders.

1. **config**: `/default.json` under this folder contain all the configuration variables.

2. **helper**: `/chat.js` under this folder contains all the functions used for handling chat functionality

3. **routes**: `/user.js` under the this defines the `user` route

4. **Schema**: contains the schema defined for the collections in mongodb.

5. **server.js**: This is the main server file which contains all the backend codes.

## Description of each routes

The following routes are defined in the app:

1. **/**: The landing page of the app is rendered.

2. **/signin01**: The first page of the two-page login form is rendered at this route. This accepts the email of the user and redirects the user to `/signin02`

3. **/signin02**: The second page of the two-page login form is rendered at this route. This accepts the password of the user and redirects to `/user` if the password and email is found correct else displays `User not registered` if the user is not registered or `Wrong Password. Try Again!` if the user types wrong password.

4. **/signup01**: The first page of the two-page signup form is rendered at this route. This accepts the name and email of the user and then redirects to `/signup02`. If the email is already in use it displays the message `Already Registered`

5. **/signup02**: The second page of the two-page signup form is rendered at this route. This accepts the password of the user and redirects to `/user`.

6. **/user**: This renders the user page.

### More about `/user`

The user page contains a sidebar, navbar and the main component which renders the profile section when the user first logs in.

The sidebar show three buttons `profile`, `chat` and `team`, clicking on which the user moves to respective sections.

#### A short intro to each section on `/user`

1. **profile**: It contains two input fields that displays user's name and email. The user can change their name and email by changing the value and clicking the save button.

2. **chat**: It contains a single input fields where the user can enter the room name that he/she wants to join. On clicking the `Join Room` button, the user is redirected to chat window where with a welcome message.

3. **team**: It contains a single input field and two buttons. If the user is the initiator, the user can click `Create Room` button to create a new meet, else the user can roomID provided by another user to enter the room.

## Details on Chat feature

The frontend code for the chat section is given in `microsoft-frontend/src/components/User/UserMain/UserMainChat.js`. Three components are defined under this file, i.e, `Messages`, `Message`, `UserMainChat`.

#### Description of these components:

1. **Message**: Each message block is defined by this component.

2. **Messages**: This component iterate over all the messages and display them on the screen.

3. **UserMainChat**: This is the main component having the input box and button to enter a room and after entering a room name it displays a chat box with a welcome message where the user can chat with other users in the same room.

This component uses three main states `room`, which defines the room name and conditionally renders the chatbox, `message`, which stores the message typed by the user and `messages`, that contain all the messages and is finally iterated on to display it on the screen.

There are two `useEffects` defined under this component which triggers when `room` and `message` state changes respectively. If the room is non-empty, then **joinRoom** event is triggered which sends a welcome message to the user who has entered the call and a message to all other users informing them that a user have joined the room. If the user has been already in that room before then it also displays all the previous chats stored in localStorage.

If a user sends a message **sendMsg** event is triggered and as a result of this **message** event is triggered that updates the `messages` state and also stores the message on localStorage. **sendMsg** also defines a callback which clears out the `message` state for new message. The updates messages array is then displayed by the `Messages` component.

## Details on Team feature

The frontend code for the team section is given in `microsoft-frontend/src/components/User/UserMain/UserMainTeam.js`. Three components are defined under this file, i.e, `Room`, `Video`, `UserMainTeam`.

#### Description of these components:

1. **Room**:

2. **Video**:

3. **UserMainTeam**:
