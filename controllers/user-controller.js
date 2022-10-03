const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')
// const { User } = require('../models')
const helpers = require('../_helpers')

const userController = {
  signIn: (req, res, next) => {
    try {
      const userData = helpers.getUser(req).toJSON()
      switch (true) {
        case (req.originalUrl === '/api/users/signin' && userData.role !== 'user'):
          throw new Error('Incorrect email or password.')
        case (req.originalUrl === '/api/admin/signin' && userData.role !== 'admin'):
          throw new Error('Incorrect email or password.')
        default: {
          delete userData.password
          const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '15d' })
          return res.json({
            status: 'success', token, user: userData
          })
        }
      }
    } catch (err) {
      next(err)
    }
  }
}
module.exports = userController
