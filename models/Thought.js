const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const reactionSchema = require ('./Reaction');

const thoughtSchema = new Schema({
    thoughtTest: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp), //getter function to modify the data when it's retrieved.
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
})

thoughtSchema.virtual('thoughtCount').get(function () {
    return this.reactions.length;
});

const Thought = model ('Thought', thoughtSchema);

module.exports = Thought;
