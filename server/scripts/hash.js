// Parol uchun bcrypt hash va tasodifiy JWT_SECRET hosil qiladi.
// Ishlatish:  node scripts/hash.js "AdminZ@123"
import bcrypt from 'bcryptjs'
import { randomBytes } from 'node:crypto'

const password = process.argv[2] || 'AdminZ@123'
const hash = bcrypt.hashSync(password, 10)
const secret = randomBytes(48).toString('hex')

console.log('\n.env uchun qiymatlar:\n')
console.log(`ADMIN_PASSWORD_HASH=${hash}`)
console.log(`JWT_SECRET=${secret}\n`)
