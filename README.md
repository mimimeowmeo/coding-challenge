This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# Frontend Developer Test

## Overview

### Objective

The objective of this test is to build a small application that interacts with the JSONPlaceholder API. It should showcase your ability to handle components, API integration, state management, and git practices. The test is designed with a flexible scope so you can complete as much as possible within the time provided.

### Duration

You will have 7 days to complete this test. You do NOT need to complete all of them. Focus on code quality, structure, and design rather than completing all the features.

### Project

You will create a simple application to display, create, edit, and delete posts using the JSONPlaceholder API. Prioritize the features in the order listed below, completing as much as you can within the time frame.

## Instructions

Setup the environment:

- fork the repository: https://gitlab.com/michael950/coding-challenge
- clone the forked repository
- install dependencies
  ```zsh
  bun install
  ```
- start dev server:
  ```zsh
  bun run dev
  ```
- the repository should come with:
  - [Nuxt3](https://nuxt.com/)
  - [Pinia](https://pinia.vuejs.org/ssr/nuxt.html)
  - [TailwindCSS](https://tailwindcss.com/)
  - [Shadcn-Vue Components](https://www.shadcn-vue.com/)
    - Feel free to add more by following instructions from the official docs
  - [NuxtIcon](https://nuxt.com/modules/icon)
    - Get Icon names from [IconesJS](https://icones.js.org/)
    ```vue
    <!-- EXAMPLE -->
    <Icon name="NAME FROM ICONIFY OR ICONESJS" />
    ```
  - [GSAP](https://gsap.com/)
  - [Formkit Auto-Animate](https://auto-animate.formkit.com/#examples)
    ```vue
    <!-- EXAMPLE -->
    <!-- apply to parent of the component to animate -->
    <div v-auto-animate>
        <div>
            component to animate
        </div>
    </div>
    ```

## Features List (By Priority):

1. List All Posts (High Priority)

- Description: Fetch and display a list of posts from the API.
- API Endpoint: GET https://jsonplaceholder.typicode.com/posts
- Requirements:
  - use Pinia to manage the state
  - Display a list of posts in a visually appealing way.
  - Bonus points if you use a table because a lot of our admin panels are tables.
  - Each post should show:
    - id
    - userId
    - title
    - the first few words of the body
      - How much to show will be up to your discretion.
  - Bonus points if you handle pagination.
  - Handle Errors

2. Create a New Post (High Priority)

- Description: Implement a form to create a new post.
- API Endpoint: POST https://jsonplaceholder.typicode.com/posts
- Requirements:
  - Add a NEW POST button somewhere
  - Click this button should open up a new post form modal.
  - The form should include inputs for title, body, and user ID.
  - Validate the form.
  - On submission, send a POST request to the API.
  - **THE REQUEST WILL NOT ACTUALLY ADD NEW CONTENT TO THE DATABASE. IT WILL INSTEAD RETURN THE NEWLY CREATED POST. ADD THIS POST TO THE STATE SO THAT IT APPEARS IN OUR LIST VIEW. DO NOT REQUERY THE LIST.**
  - Display the newly created post in the list.
  - Handle Errors

3.  Delete a Post (High Priority)

- Description: Implement a button and a confirmation modal to delete an existing post.
- API Endpoint: DELETE https://jsonplaceholder.typicode.com/posts/{id}
- Requirements:
  - Add a delete button for each post.
  - Clicking this button should open up a confirmation modal.
  - Clicking cancel/no should close the modal. Clicking confirm/yes should initiate the delete request.
  - On click, send a DELETE request to remove the post.
  - **THE REQUEST WILL NOT ACTUALLY REMOVE CONTENT FROM THE DATABASE. REMOVE THE POST FROM THE STATE SO THAT IT DISAPPEARS IN OUR LIST VIEW. DO NOT REQUERY THE LIST.**
  - Handle Errors

4. Edit a Post (Medium Priority)

- Description: Implement functionality to edit an existing post.
- API Endpoint: PUT https://jsonplaceholder.typicode.com/posts/{id}
- Requirements:
  - Implement an edit button in the list.
  - The button should open up a form to edit the data.
  - Allow updating the title and body only.
  - Validate the form.
  - On submission, send a PUT request to the API.
  - **THE REQUEST WILL NOT ACTUALLY UPDATE CONTENT IN THE DATABASE. UPDATE THE POST IN THE STATE SO THAT IT GETS UPDATED IN OUR LIST VIEW. DO NOT REQUERY THE LIST.**
  - Handle Errors

5. View Post Details (Low Priority)

- Description: Implement a feature to view a single post's details AND its comments
- API Endpoint: GET https://jsonplaceholder.typicode.com/posts/{id}
- API Endpoint: GET https://jsonplaceholder.typicode.com/posts/{id}/comments
- Requirements:
  - When a user clicks on a post, navigate to a detailed view showing the full post.
  - Display:
    - id
    - userId
    - title
    - full body
    - all the comments associated with the post
  - Handle Errors

6. Bonus Features (Very Low Priority)

- Use GSAP animations
- Unit Testing: Write a few unit tests for the components (optional).
- Responsive Design: Ensure the app works well on both desktop and mobile devices.
- Handle Pagination

Guidelines:

- **IMPORTANT**: Commit frequently, with clear commit messages
  - This will help us follow your line of thought
- To submit, open a PR/MR to the original repository
- You can use the THOUGHTS.md to document your thought process, decisions, and any trade-offs made during development.
