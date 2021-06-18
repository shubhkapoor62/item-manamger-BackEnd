const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    bookName: { type: String, required: true },
    hindiName: { type: String, required: true },
    barcode: { type: String, required: true },
    hsn: { type: String, required: true },
    tax: {type: Number, default: 2, required: true},
    publisher:{ type: String, required: true },
    type: { type: String, required: true },
    rate: {type: Number, default: 2, required: true}
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