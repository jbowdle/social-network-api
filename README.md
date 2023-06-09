# Social Network API

## Description

This is a social network API that stores users and their thoughts in a MongoDB database. Also stored are user's friends and reactions that they make on others' thoughts. CRUD operations can be performed on users, friends, thoughts, and reactions. 

## Start up Instructions

To install dependencies, type into the command line:
```
npm i
```

To run the program:
```
npm start
```

## Routes

* get, post api/users
  * Get route will return all stored users.
  * Post will create a new user and requires a username and valid email address.

* get, put, delete api/users/:userId
  * Get will return a single user along with all their thoughts and friends.
  * Put will update a single user and can take a username or valid email address.
  * Delete will delete a single user. All associated thoughts will be deleted and the user will be removed from other user's friend lists. Their reactions will remain but their username will be replaced with \[deleted\].

* post, delete api/users/:userId/friends/:friendId
  * Post will add a friend to the specified user's friend list.
  * Delete will remove a friend from the specified user's friend list.

* get, post api/thoughts
  * Get will return all thoughts and its associated reactions.
  * Post will create a new thought and requires thoughtText, the username of the user posting the thought, and their userId.

* get, put, delete api/thoughts/:thoughtId
  * Get will return a single thought.
  * Put will update a single thought and can take thoughtText, username, or userId.
  * Delete will delete a single thought.

* post api/thoughts/:thoughtId/reactions
  * Post will create a reaction on a thought and requires a reactionBody and username of the user who posted the reaction.

* delete api/thoughts/:thoughtId/reactions/:reactionId
  * Delete will delete a single reaction from a thought.

## Technologies Used
* Express
* MongoDB
* Mongoose

## Walkthrough video

This video uses Insomnia to show the functionality of all routes.

[Walkthrough](https://drive.google.com/file/d/1BhzE-r0jYqVgG6AtHMMpBuTh9XWOZWrb/view)