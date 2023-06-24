import jwt from 'jsonwebtoken'
import createError from './createError.js'

const checkAuth = (req, _res, next) => {
  const token = req.cookies.access_token
  if (!token) {
    return next(createError({ status: 401, message: 'Unauthorized' }))
  }
  return jwt.verify(token, process.env.JWT_TOKEN, (error, decoded) => {
    if (error) {
      return next(createError({ status: 401, message: 'Invalid token' }))
    }
    req.user = decoded
    return next()
  })
}

export default checkAuth
