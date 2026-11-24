import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'

const generateTokee = (payload: JwtPayload) => {
    return jwt.sign(payload, config.jwt_secret as string, {
        expiresIn:'1h',
    })
}
const varifyToken = (token: string) => {
    return jwt.verify(token, config.jwt_secret as string);
}

export const jwtHelper = { generateTokee, varifyToken };
