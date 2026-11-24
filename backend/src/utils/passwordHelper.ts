import bcrypt from 'bcrypt'

const hashPasword = async (password:string) => {
    return await bcrypt.hash(password, 10);
}

const compareHash = async (password :string,hashpasword :string) => {
    return await bcrypt.compare(password,hashpasword)
}

export const passwordHelper = {
    hashPasword,
    compareHash
}