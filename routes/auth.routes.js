// User Routes 
// /api/auth

import { Router } from 'express'
import { createNewUser, loginUser, renewUser, renewToken } from '../controllers/auth.js'
import { check } from 'express-validator'
import { validateResults } from '../middlewares/validateResults.js'
import { validateJWT } from '../middlewares/validateJWT.js'

const router = Router()

const validateMiddlewares = [
  check('email', 'Email is invalid').isEmail(),
  check('password', 'Password must contain at least 6 characterers').isLength({ min: 6 }),
  validateResults
]

// Create New User
router.post(
  // path
  '/new',
  // middlewares
  [
    check('name', 'Name is required').not().isEmpty(),
    ...validateMiddlewares
  ],
  // Controller function
  createNewUser
)

// Login User
router.post(
  '/', 
  validateMiddlewares,
  loginUser
)

router.get('/renew', validateJWT, renewUser)


// This methos utilize a promise and handle the response here
// router.get('/renew', async (req, res) => {
//   const {user} = req.body
//   const data = await renewToken(user)
//   res.json(data)
// })

export const authRouter = router

// export default router
