const mongoose = require('mongoose');
const { Schema, model } = mongoose;
// const { userSchema } = require (); //what other schemas will be required for User?

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, `Please enter a valid email.`] //regex from online (does this work?)
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length; //Retrieved the length of 'friends' array in User schema using a virtual
});

const User = model('User', userSchema);

module.exports = User; //exporting out of the models folder.