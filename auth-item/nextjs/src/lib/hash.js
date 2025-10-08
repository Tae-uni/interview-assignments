import bcrypt from 'bcrypt';

export async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(hashedPassword, password) {
    return await bcrypt.compare(hashedPassword, password);
}