import { prisma } from "../db/db.config.js"
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import "dotenv/config"





const authenticateToken = (req, res, next) => {
    const token = req.header('authorization')?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const register = async (req, res) => {
    const { username, email, password } = req.body;


    console.log('Received data:', { username, email, password });


    if (!username || !email || !password) {
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

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword,
            },
        });

        return res.status(201).json({ message: 'User registered successfully', user: newUser });

    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const login = async () => {
    const { email, password } = req.body;
    console.log('Login attempt:', { email });

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

}



const getUser = async (req, res) => {
    try {
        const { page = 1 } = req.query; // Get page number from query, default to 1 if not provided
        const pageSize = 10; // Define page size (10 users per page)

        // Fetch users with pagination
        const users = await prisma.user.findMany({
            skip: (page - 1) * pageSize, // Calculate the number of users to skip
            take: pageSize, // Limit the number of users returned
        });

        // Fetch total count of users
        const totalUsers = await prisma.user.count();

        // Calculate total pages
        const totalPages = Math.ceil(totalUsers / pageSize);

        return res.json({
            users,
            page: Number(page),
            pageSize,
            totalPages,
            totalUsers,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Server error, please try again later." });
    }
};


const getSingleUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
        });


        if (!user) {
            return res.status(404).json({ message: `User with ${id} not found` });
        }

        return res.json(user);
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        return res.status(500).json({ message: "Server error, please try again later." });
    }
};

const updateUserById = async (req, res) => {

    try {
        const userId = req.params.id
        const { username, email, password } = req.body

        const updateUser = await prisma.user.update({
            where: {
                id: Number(userId)
            },
            data: {
                username,
                email,
                password
            }
        })
        return res.status(201).json({
            message: `User With Id ${userId} Updated Successfully`,
            updateUser
        })
    } catch (error) {
        console.log(error);
    }
}


const deleteUserById = async (req, res) => {

    try {
        const id = req.params.id
        await prisma.user.delete({
            where: {
                id: Number(id)
            }
        })

        return res.status(201).json({
            message: `user ${id} Deleted Successfully`
        })
    } catch (error) {
        throw new error(`Something Went Wrong while deleting ${id} this user `, error)
    }
}


const createTodo = async (req, res) => {

}

export { login, register, getUser, getSingleUserById, updateUserById, deleteUserById, createTodo };
