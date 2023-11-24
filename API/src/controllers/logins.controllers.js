import jwt from 'jsonwebtoken';

export const get = async (req, res) => {
    try {
        jwt.sign({user: user},'secretkey', (err, token)=> {
            res.json({
                token: token
            })
        })
    } catch (error) {
        
    }
}   