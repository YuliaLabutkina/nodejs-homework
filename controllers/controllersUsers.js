const jwt = require('jsonwebtoken')
const Users = require('../model/users')
const { HttpCode } = require('../helpers/constants')
const User = require('../model/schemas/users')
require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET

const register = async (req, res, next) => {
  try {
      const { email } = req.body
      const user = await Users.findByEmail(email)
      if (user) {
          return res
          .status(HttpCode.CONFLICT)
          .json({
            status: 'error',
            code: HttpCode.CONFLICT,
            data: 'Conflict',
            message: 'Email is already use',
          })
      }
    const newUser = await Users.create(req.body)
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
    })
  } catch (err) {
    next(err)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await Users.findByEmail(email)
    const isValidPassword = await user.validPassword(password)
    if (!user || !isValidPassword) {
        return res
        .status(HttpCode.UNAUTHORIZED)
        .json({
          status: 'error',
          code: HttpCode.UNAUTHORIZED,
          data: 'unauthorized',
          message: 'Invalid credantials',
        })
    }

    const id = user._id
    const payload = { id }
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '2h'})
    await Users.updateToken(id, token)

  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: {
      token,
    },
  })
} catch (err) {
  next(err)
}
}

const logout = async (req, res, next) => {
    try {
      const id = req.user.id
      await Users.updateToken(id, null)
      return res.status(HttpCode.NO_CONTENT).json({ 
        email: req.user.email,
        subscription: "free"
      })
    } catch (err) {
      next(err)
    }
}

const getUserInfo = async (req, res, next) => {
  try {
    return res.status(HttpCode.OK).json({ 
      email: req.user.email,
      subscription: "free"
    })
  } catch (err) {
    next(err)
  }
}

const updateSubscription = async (req, res, next) => {
  try {
    const { subscription } = req.body;
    if(!subscription) {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: 'Error subscription',
        code: HttpCode.BAD_REQUEST,
        data: {
          subscription,
        },
      })
    }

    const id = req.user.id
    await Users.updateSubscription(id, subscription)
    return res.status(HttpCode.OK).json({ 
      status: 'Update subscription',
      code: HttpCode.OK,
      subscription
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  register,
  login,
  logout,
  getUserInfo,
  updateSubscription,
}