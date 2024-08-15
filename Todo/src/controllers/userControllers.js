
import { prisma } from "../index.js"

const register = async (req, res) => {
    const { name, email, } = req.body;

    console.log({ name, email });

    if (!name || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }


        const newUser = await prisma.user.create({
            data: {

                name, email

            },
        });

        return res.status(201).json({ message: 'User registered successfully', user: newUser });

    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export {
    register
}
