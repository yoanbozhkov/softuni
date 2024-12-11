## Tennis Forum Documentation

# Overview

The application consists of three main things : Users, Posts and Comments. It provides functionalities for user authentication, post creation, and interaction through comments.

# Key Features

User Authentication: Register and login forms.

Post Management: Create, edit, delete, and view posts.

Comment Management: Add, edit, delete, and view comments for posts.

# Users Features

Registration: Allows new users to sign up with their details.

Login: Enables registered users to log in.

Profile: Displays user-specific information.

# User Validation

Ensure all required fields are filled.

Passwords must meet complexity requirements (e.g., minimum length).

# Posts Features

Create Post: Users can create new posts by providing a title and description.

Edit Post: Users can update their posts.

Delete Post: Users can delete posts they own.

View Posts: Users can view a list of all posts and individual post details.

# Posts Validation

Only authenticated users can create, edit, or delete posts.

Ensure required fields (e.g., title, description) are provided.

# Comments Features

Add Comment: Users can add comments to posts.

Edit Comment: Users can update their comments.

Delete Comment: Users can delete their comments.

View Comments: Users can view comments associated with a post.

# Comments Validation

Only authenticated users can add, edit, or delete comments.

Ensure required fields (e.g., content) are provided.

# Technology Stack

Angular 18
MongoDB
CSS
HTML
Node.js
BCrypt
JWT
Express
