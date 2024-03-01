# Project: Pixellate

---

## Overview

Pixellate is a web application designed for uploading and sharing images.

---

## Installation

To get started with Pixellate, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/istebsharul/Pixellate.git
   ```

2. Navigate to the project directory:

   ```bash
   cd pixellate
   ```

3. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

---

## Frontend

The frontend folder contains the user interface of the Pixellate application.
To run the frontend, execute the following command:

   ```bash
   cd frontend
   npm start
   ```

---

## Backend

The backend folder contains the server side of the Pixellate application.
To run the backend, execute the following command:

   ```bash
      cd ../backend
      npm run dev
   ```


## Features

1. **User Authentication:** Users can sign up for an account or log in to their existing account.
   - Test link: [Sign Up](http://localhost:3000/signup) | [Login](http://localhost:3000/login)

2. **Image Upload:** Users can upload images to their profile.
   - Test link: [Image Upload](http://localhost:3000/profile)

3. **Mosaic Formation:** Uploaded images are displayed in mosaic formation on the landing page and user profile page.
   - Test link: [Landing Page](http://localhost:3000) | [User Profile](http://localhost:3000/home)

4. **Pages:**
   - **Landing Page:** Randomly selected user-uploaded images are displayed.
   - **Sign Up Page:** Users can sign up for an account.
   - **Login Page:** Users can log in to their account.
   - **User Profile Page:** Users can upload images and view their uploaded images.
   - **User Public Page:** Display user's uploaded images based on their username.
   
5. **Test Link: Only after starting application both backend and frontend**
  - [Landing Page](http://localhost:3000/home) 
  - [Sign Up Page](http://localhost:3000/signup) 
  - [Login Page](http://localhost:3000/login) 
  - [User Profile Page](http://localhost:3000/profile) 
  - [User Public Page](http://localhost:3000/pprofile/nature)
  - Sample User = bike, nature, coding, street, flower
