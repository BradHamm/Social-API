const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');

const thoughtController = {
    getAllThoughts: async (req,res) => {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error - thoughtController.getAllThoughts' });
        }
    },

    getThoughtById: async (req,res) => {
        try {
            const thought = await Thought.findById(req.params.id)
                .populate('thoughts')
            if (!thought) {
                return res.status(404).json({ message: 'Thought Id not found'});
            }
            res.json(thought);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error - thoughtController.getThoughtById' });
        }
    },

    createThought: async (req,res) => {
        try {
            const thought = await Thought.create(req.body);
            res.status(201).json(thought);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error - thoughtController.createThought' });
        }
    },

    updateThought: async (req,res) => {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!thought) {
                return res.status(404).json({ message: 'Thought Id not found' });
            }
            res.json(thought);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error - thoughtController.updateThought' });
        }
    },

    deleteThought: async (req,res) => {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.id);
            if(!thought) {
                return res.status(404).json({ message: 'Thought Id not found' });
            }
            res.json({ message: 'Thought deleted' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error - thoughtController.deleteThought' });
        }
    },

    createReaction: async (req,res) => {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.id, { $push: { reactions: req.body } }, { new: true });
            if(!thought) {
                return res.status(404).json({ message: 'Thought Id not found' });
            }
            res.json(thought);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error - thoughtController.createReaction' });
        }
    },

    deleteReaction: async (req,res) => {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.id, { $pull: { reactions: { _id: req.params.reactionId}}}, { new: true });
            if (!thought) {
                res.status(404).json({ message: 'Thought Id not found'});
            }
            res.json(thought);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error - thoughtController.deleteReaction' });
        }
    }
}