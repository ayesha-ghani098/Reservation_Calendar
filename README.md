# Reservation Calendar

This repository contains a task to build reservation calendar. The project consists of two main components: an API server written in NodeJs provided, which implements various methods related to booking management; and a front-end website that allows customers to view available slots for making reservations in Angular Js 1.4.
<br/>

## Installation

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.10.

Clone the repository

```
https://github.com/ayesha-ghani098/Reservation_Calendar.git
```

### Dependencies & Prerequisites

Make you have installed node version v6.9.5
or use nvm to switch between node versions

```
# Node Version
node -v
# 6.9.5

# Node Versions list
nvm ls
# 16.17.1
# * 6.9.5 (Currently using 64-bit executable)

# Use Specific Version
nvm use 6.9.5
```

Make sure you have installed Angular Cli 1.4.10

```
npm install -g angular-cli@1.4.10
```

<br/>

### For server
Install the package dependencies by running the following command in the root directory
```
npm install
# if not work use latest version of npm 
# than switch back to 6.9.5 for client
```
Once the dependencies are installed, you can start the application server by running
```
npm start
```
Once the server is running, you can start making requests to http://localhost:3000.
<br/>

### For Client
Install the package dependencies by running the following command in the client folder
```
npm install
# use node version 6.9.5
```
Once the dependencies are installed, you can start the application server by running in the client folder
```
npm start or ng serve
```
Once the server is running, you can start making requests to http://localhost:4200/.
### Note

I was trying to run it concurrently that is why project structure is like this

<br/>

## Task Requirements
- A way to navigate between months.
- A way to add tennants to a day.
- A way to remove tennants from a day.
- A clear README on how to set up and run your submission.

### Good to have

- Feature to select multiple dates in one go.
- Feature to show the names of the tennants on the days without clicking on the days on the calendar.
- Feature to show the list of tennants outside for readability.

<br/>

## Tasks Completed
- A way to navigate between months.
- A way to add tennants to a day.
- A way to remove tennants from a day.
- A clear README on how to set up and run your submission.
- Feature to show the names of the tennants on the days without clicking on the days on the calendar.
- Feature to show the list of tennants outside for readability.

### Note

I was using change detector function to regenerate calendar if you don't see names of tenant on calendar and list (Refresh the page for now)
I ll update it
