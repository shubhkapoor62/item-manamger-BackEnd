const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    address1: { type: String, required: true },
    address2: { type: String },
    zipcode: { type: String },
    city: { type: String },
    country: { type: String }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Address', schema);