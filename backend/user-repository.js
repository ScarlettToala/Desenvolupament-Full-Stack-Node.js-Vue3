import bcrypt from 'bcrypt'
import DBLocal from 'db-local'
import crypto from 'node:crypto'
import { SALT_ROUNDS } from './config.js'

const { Schema } = new DBLocal({ path: './db' })

const User = Schema('User', {
    _id: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
})
export class UserRepository {
    static async create({ username, password }) {
        console.log("1. Validando...");
        Validation.username(username)
        Validation.password(password)

        console.log("2. Buscando si existe...");
        const user = User.findOne({ username })
        if (user) throw new Error('username already exists')
        console.log("3. Hasheando password...");
        const id = crypto.randomUUID()
        const hashedPassword = await bcrypt.hash(password, Number(SALT_ROUNDS));
        console.log("4. Guardando en DB...");
        try {
            User.create({
                _id: id,
                username,
                password: hashedPassword
            }).save()
            return id
        } catch (dbError) {
            throw new Error('Error al guardar en la base de datos: ' + dbError.message);
        }
    }
    static async login({ username, password }) {
        Validation.username(username)
        Validation.password(password)

        const user = User.findOne({ username })
        if (!user) throw new Error('username does not exist')
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) throw new Error('password is invalid')
        const { password: _, ...publicUser } = user
        return publicUser
    }

}
class Validation {
    static username(username) {
        if (typeof username != 'string') throw new Error('username must be a string');
        if (username.length < 2) throw new Error('Username superior a 3 caracteres');
    }
    static password(password) {
        if (typeof password != 'string') throw new Error('Password must be a string');
        if (password.length < 2) throw new Error('password superior a 5 caracteres');
    }
}