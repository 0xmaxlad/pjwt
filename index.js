import jwt from 'jsonwebtoken'
import crypto from 'crypto' 

/**
 * Signs a JWT token using a derived secret from main JWT secret and a subsecret
 * @param {Object} payload - Data to be encoded in the JWT
 * @param {number} subsecretIndex - Index of the subsecret to use
 * @param {Array<string>} subsecrets - Array of subsecrets
 * @param {Object} options - JWT sign options (optional)
 * @returns {string} Signed JWT token
 */
export function signToken(payload,subsecrets,JWT_SECRET, options = {}) {
  if (JWT_SECRET) {
    throw new Error('JWT_SECRET is not provided');
  }

  if (!subsecrets || !Array.isArray(subsecrets)) {
    throw new Error('subsecrets must be an array');
  }

  const subsecretIndex = Math.floor(Math.Random() * subsecrets.length) 

  // Create a derived secret by combining JWT_SECRET and subsecret
  const derivedSecret = crypto
    .createHash('sha256')
    .update(`${JWT_SECRET}${subsecrets[subsecretIndex]}`) 
    .digest('hex');

  // Sign the token with the derived secret
  return jwt.sign(payload, derivedSecret, options);
}

export function invalidateToken(subsecretIndex,subsecrets,newSubsecret,options={}){
    if (!subsecrets || !Array.isArray(subsecrets)) {
        throw new Error('subsecrets must be an array');
      }
    
    if (subsecretIndex < 0 || subsecretIndex >= subsecrets.length) {
      throw new Error('Invalid subsecret index');
    }

}

export function revalidateValidToken(){

}

export function verifyToken(token,subsecretIndex,subsecrets){
    if (subsecretIndex < 0 || subsecretIndex >= subsecrets.length) {
        throw new Error('Invalid subsecret index');
    }

    if(token == null){
        throw new Error('Invalid token')
    }

    const derivedSecret = crypto
    .createHash('sha256')
    .update(`${process.env.JWT_SECRET}${subsecrets[subsecretIndex]}`)
    .digest('hex');

    return jwt.verify(token,derivedSecret) 

}

const pjwt = {signToken, invalidateToken, revalidateValidToken, verifyToken} 

export default pjwt 

