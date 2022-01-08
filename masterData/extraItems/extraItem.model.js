const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    itemName: { type: String, required: true },
    price: { type: String, required: true }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('extraItem', schema);