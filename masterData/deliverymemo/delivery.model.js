const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    billingTotalForm:
    {
        'comment': String, 'discPercent': Number, 'discount': Number, 'handling': Number, 'roundOff': Number,
        'subtotal': Number, 'total': Number, 'totalQuant': Number
    },
    customerDetails:
        { 'address': String, 'billingDate': Date, 'customerName': String, 'mobileNo': String, 'zip': String },
    orderList:
        [{ 'bookId': mongoose.ObjectId, 'book': String, 'rate': Number, 'amount': Number, 'less': Number, 'publisher': String, 'quantity': Number }]
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('deliveryMemo', schema);