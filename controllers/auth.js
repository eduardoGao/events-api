import express from "express"
import { User } from "../models/user-model.js"
import bcryptjs from "bcryptjs"
import { generateJWT } from "../helpers/jwt.js"

export const createNewUser = async (req, res = express.response) => {
  const { name, email, password } = req.body

  const user = new User({ name, email, password })

  try {
    // Return if email already exist
    const findUserByEmail = await User.findOne({ email })
    if(findUserByEmail) {
      return res.status(403).json({
        ok: false,
        message: 'Email or password are wrong'
      })
    }
    
    // Generate encrypted password
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password, salt)

    // Create new user
    await user.save()

    // Get JWT
    const token = await generateJWT(user.id, user.name)

    res.status(201).json({
      ok: true,
      uid: user.id,
      name,
      email,
      token
    })

  } catch (error) {
    getError(res, error)
  }
}

export const loginUser = async (req, res = express.response) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if(!user) {
      return res.status(403).json({
        ok: false,
        message: 'Email or password are wrong'
      })
    }

    // Validate encrypted password
    const validatePassword = bcryptjs.compareSync(password, user.password)
    if(!validatePassword) {
      return res.status(400).json({
        ok: false,
        message: 'Email or password are wrong'
      })
    }

    
    // Get JWT
    const token = await generateJWT(user.id, user.name)


    res.json({
      ok: true,    
      uid: user.id,
      token,
      email: user.email,
      name: user.name
    })

  } catch (error) {
    getError(res, error)
  }

}

export const renewUser = async (req, res = express.response) => {
  const uid = req.uid
  const name = req.name

  // Generate new JWT
  const token = await generateJWT(uid, name)

  res.json({
    ok: true,
    token,
    uid,
    name
  })
}

export const renewToken = (user = '') => {
  return new Promise((resolve, reject) => {
    if (user.length < 1) {
      reject({
        ok: false,
        error: 'user must contain at least one word'
      })
    } else {
      resolve({
        ok: true,
        endpoint: 'promise token',
        user
      })
    }
  })
}

const getError = (res, error) => {
  console.log(error);

  res.status(500).json({
    ok: false,
    message: 'Something is wrong. Server Error'
  })
  
}