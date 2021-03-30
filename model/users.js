const User = require('./schemas/users')

const findByEmail = async(email) => {
    return await User.findOne({ email })
}

const findById = async(id) => {
    return await User.findOne({ _id: id })
}

const create = async({name, email, password, subscription, verify, verifyToken }) => {
    const user = await new User({name, email, password, subscription, verify, verifyToken })
    return await user.save()
}

const updateToken = async(id, token) => {
    return await User.updateOne({ _id: id }, { token })
} 

const updateSubscription = async (id, subscription) => {
    return await User.updateOne({ _id: id }, { subscription });
}

const updateAvatar = async (id, avatar) => {
    return await User.updateOne({ _id: id }, { avatar });
}

const findByVerifyToken = async (verifyToken) => {
    return await User.findOne({ verifyToken })
}

const updateVerifyToken = async (id, verify, verifyToken) => {
    return await User.findOneAndUpdate({ _id: id }, { verify, verifyToken })
}

module.exports = {
    findByEmail,
    findById,
    create,
    updateToken,
    updateSubscription,
    updateAvatar,
    findByVerifyToken,
    updateVerifyToken,
}