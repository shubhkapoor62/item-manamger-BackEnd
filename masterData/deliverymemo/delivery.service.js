const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const DeliveryMemo = db.DeliveryMemo;


module.exports = {
    authenticate,
    getDeliveryMemo,
    getDeliveryMemoById,
    createDeliveryMemo,
    updateDeliveryMemo,
    deleteDeliveryMemo
};

async function authenticate({ username, password }) {
    console.log('in login')
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
    }
}

async function getDeliveryMemo() {
    return await DeliveryMemo.find();

}

async function getDeliveryMemoById(memoId) {
    return await DeliveryMemo.find({ _id: memoId });
}

async function createDeliveryMemo(memoList) {
    let memoDataObj = memoList;
    const deliverymemo = new DeliveryMemo(memoDataObj);
    deliverymemo.save();
}

async function updateDeliveryMemo(memoData) {
    return await DeliveryMemo.replaceOne({ _id: memoId  },
        memoData
    );
}

async function deleteDeliveryMemo(memoId) {
    console.log(memoId, 'hello');
    try {
        return await DeliveryMemo.deleteOne({ _id: memoId });
    } catch (e) {
        throw e;
    }
}



