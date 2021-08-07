const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    className: { type: String, required: true },
    strength: { type: Number }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('SchoolClass', schema);