const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, required: true },
    address: { address1: String, address2: String, zipcode: String, city: String, country: String },
    mobileNo: { type: String },
    gst: { type: String },
    phoneNo: { type: String }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Customer', schema);