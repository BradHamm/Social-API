const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/', userController.getAllUsers); //gets all users
router.get('/:id', userController.getUserById); //gets user by id
router.post('/', userController.createUser); //creates a new user
router.put('/:id', userController.updateUser); //updates the user's information by id
router.delete('/:id', userController.deleteUser); //deleted the user's instance by id
router.get('/:id/all', userController.getAssociatedThoughtsAndFriends); //retrieved all of the assocaited user's friends and thoughts.
router.post('/:id/friends/:friendId', userController.addFriend) //adds friend to friend list
router.delete('/:id/friends/:friendId', userController.deleteFriend) //removed friend from friend list

module.exports = router;