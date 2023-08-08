const User = require('../models/User');
const Thought = require('../models/User');

const userController  = {
    getAllUsers: async (req,res) => {
        try{
            const users = await User.find();
            res.json(users); //find() all instances of users and return then in JSON
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error - userController.getAllUsers'});
        }
    },

    getUserById: async (req,res) => {
        try {
            const user = await User.findById(req.params.id)
                .populate('thoughts')
                .populate('friends'); //references database for both friends and thoughts rather than make multiple requests to retrieve info
            //do I need the .populate if i'm not even directly using either of these?
            if (!user) {
                return res.status(404).json({ message: 'User Id not found'});
            }

            res.json(user);
       } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error - userController.getUserById'});
       }
    },

    createUser: async (req,res) => {
        try {
            const user = await User.create(req.body); //creates a new instance of the user, given the information passed in the body of the req
            res.status(201).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error - userController.createUser'});
        }
    },

    updateUser: async (req,res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

            if (!user) {
                return res.status(404).json({ message: 'User Id not found'});
            }
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error - userController.updateUser' });
        }
    },

    deleteUser: async (req,res) => {
        try{
            const user = await User.findById(req.params.id); //TODO: does this just delete the thoughts of the user or the user itself?

            if(!user) {
                return res.status(404).json({ message: 'User Id not found'});
            }

            await Thought.deleteMany({ username: user.username });
            //targets thoughts sharing the username of the user and deletes them using the built in deleteMany method.
            res.json({ message: 'User and Thoughts deleted.'})

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error - userController.updateUser' });
        }
    },

    getAssociatedThoughtsAndFriends: async (req,res) => {
        try {
            const user = await User.findById(req.params.id)
                .populate('thoughts')
                .populate('friends')

        if (!user) {
            return res.status(404).json({ message: 'USer Id not found'});
        }

        res.json({
            user,
            thoughts: user.thoughts,
            friends: user.friends,
        });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error - userController.getAssocaitedThoughtsAndFriends' });
        }
    },

    addFriend: async (req,res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $addToSet: { friends: req.params.friendId } }, { new: true });

        if (!user) {
            res.status(404).json({ message: 'User Id not found'});
        }

        res.json(user);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error - userController.addFriend' });
        }
    },

    deleteFriend: async (req,res) => {
        try{
            const user = await User.findByIdAndUpdate(req.params.id, { $pull: {friends: req.params.friendId} }, { new: true });

        if (!user) {
            res.status(404).json({ message: 'User Id not found'});
        }
        res.json(user);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error - userController.deleteFriend' });
        }
    },
}

module.exports = userController;