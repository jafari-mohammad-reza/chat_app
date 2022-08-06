const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {isValidObjectId} = require("mongoose");
exports.Login = async (req, res, next) => {
    try {
        const {identifier, password} = req.body;
        if (!identifier || !password) {
            return res.status(400).json({
                message: "Please provide email or username and password",
            });
        }
        const user = await UserModel.findOne({
            $or: [{email: identifier}, {userName: identifier}],
        });
        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({
                message: "User not found",
            });
        }
        user.access_token = jwt.sign(
            {
                _id: user._id,
            },
            process.env.JWT_SECRET,
            {expiresIn: "24h"}, function (err) {
                if (err) throw err
            }
        );

        await user.save();
        return res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                email: user.email,
                userName: user.userName,
                access_token: user.access_token
            },
        });
    } catch (error) {
        next(error);
    }
};

exports.Register = async (req, res, next) => {
    try {
        const {username, email, password, confirmPassword} = req.body;
        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({
                message: "Please provide all the fields",
            });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match",
            });
        }
        const user = await UserModel.findOne({
            $or: [{email: email}, {userName: username}],
        });
        if (user) {
            return res.status(400).json({
                message: "User already exists",
            });
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        await UserModel.create({
            email,
            userName: username,
            password: hashedPassword,
        });
        return res.status(201).json({
            message: "User created successfully",
        });
    } catch (error) {
        next(error);
    }
};

exports.SetUserAvatar = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {image} = req.body;
        if (!id || !isValidObjectId(id)) {
            return res.status(400).json({message: "Not a valid userid"})
        }
        if (!image) {
            return res.status(400).json({message: "Please provide an image"})
        }
        const user = await UserModel.findOne({_id: id}).catch(err => {
            return res.status(400).json({message: err.message})
        })
        if (!user) {
            return res.status(404).json({message: "Not a valid userId"})
        }
        user.avatar_url = image
        user.isAvatarChanged = true
        await user.save()
        return res.status(200).json({
            message: "user avatar has been set successfully.",
            image: user.avatar_url,
            status: 200
        })
    } catch (err) {
        next(err)
    }
}


exports.GetAllUsers = async (req, res, next) => {
    try {
        const {id} = req.params
        const contacts = await UserModel.find({
            _id: {$ne: id}
        }).select([
            "email",
            "userName",
            "avatar_url",
            "_id"
        ]).catch(err => {
            throw {message: err.message, status: 500}
        })
        return res.status(200).json({
            contacts,
            status: 200
        })
    } catch (error) {
        next(error)
    }
}
