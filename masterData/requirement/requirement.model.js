const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    schoolName: { type: String, required: true },
    schoolId: { type: mongoose.ObjectId, required: true, unique: true },
    className: { type: String, required: true },
    classId: { type: mongoose.ObjectId, required: true, unique: true },
    books: [{ 'bookId': mongoose.ObjectId, 'bookName': String, 'publisher': String, 'rate': Number, 'quantity': Number, 'less': Number, 'amount': Number }],
    extras: [{ 'extraId': mongoose.ObjectId, 'itemName': String,  'rate': Number, 'quantity': Number, 'less': Number, 'amount': Number }],
    totalPriceBooks: Number,
    totalPriceExtra: Number,
    totalPrice: Number
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('requirement', schema);