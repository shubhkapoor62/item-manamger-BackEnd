const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, required: true },
    address: { type: Object },
    phoneNo: { type: String },
    mobileNo: { type: String },
    gst: { type: String },
    strength: { type: Number},
    classinfo: [{ name: String, strength: Number }]
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('School', schema);