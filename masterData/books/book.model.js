const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    bookName: { type: String, required: true },
    hindiName: { type: String },
    barcode: { type: String },
    hsn: { type: String },
    tax: { type: Number, default: 2 },
    publisher: { type: String },
    type: { type: String },
    rate: { type: Number }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Book', schema);