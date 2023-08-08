const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(), //Aren't new ObjectId's made by default within Mongo? Why use this here and not in User or Thought?
    },
    reactionBody: {
        type: String,
        required: true, //Do I have to set a minlength of 1? Or does true validator for reactionBody take care of that?
        maxlength: 280,
    },
    usernme: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp => dateFormat(timestamp),)
    },
});

const Reaction = ('Reaction', reactionSchema);

module.exports = Reaction;