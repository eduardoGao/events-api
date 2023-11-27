import jwt from "jsonwebtoken";

// values to get in the jwt
export const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name }
  
    jwt.sign(payload, process.env.JWT_SECRET_SEED, {
      expiresIn: '2h',
    }, (err, token) => {
      if(err) {
        console.log(err);
        reject('Error generating token')
      }

      resolve(token)
    })
  })
}