import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import createError from '../utils/createError.js'

export const signup = async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return next(
      createError({
        status: 400,
        message: 'Username and passord are required.',
      }),
    )
  }

  try {
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(req.body.password, salt)
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    })
    await newUser.save()
    return res.status(201).json({ id: newUser.id })
  } catch (error) {
    return next(error)
  }
}

export const signin = async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return next(
      createError({
        status: 400,
        message: 'Username and passord are required.',
      }),
    )
  }

  try {
    const user = await User.findOne({ username: req.body.username }).select(
      'username password',
    )

    if (!user) {
      return next(createError({ status: 404, message: 'No user found' }))
    }

    const ifPasswordCorrect = await bcryptjs.compare(
      req.body.password,
      user.password,
    )

    if (!ifPasswordCorrect) {
      return next(
        createError({ status: 400, message: 'Password is incorrect' }),
      )
    }

    const payload = {
      id: user._id,
      usernmae: user.username,
    }

    const token = jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: '1d' })

    return res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json({ id: payload.id })
  } catch (error) {
    return next(error)
  }
}

export const signout = (_req, res) => {
  res.clearCookie('access_token')
  return res.status(200).json({ message: 'Signed out' })
}

export const signedIn = (req, res) => {
  const token = req.cookies.access_token
  if (!token) {
    return res.json(false)
  }
  return jwt.verify(token, process.env.JWT_TOKEN, (error) => {
    if (error) {
      return res.json(false)
    }
    return res.json(true)
  })
}
