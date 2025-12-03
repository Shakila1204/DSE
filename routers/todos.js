const { db } = require('../config/db');

const router = require('express').Router()
const  jwt =  require('jsonwebtoken')


const auth = async (req, res, next) => {
    try {

        const token = req.headers.authorization?.split(" ")[1];
        // console.log(token);

        if (!token) return res.status(401).json({ status: "fail", message: "Login to get access" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        const user = await db.query(`SELECT * FROM users WHERE id=${decoded.id}`);

        req.user = user
        return next()

    } catch (error) {
        console.log(error.message);

    }
}


router.get("/api/todos/", auth ,async function (req, res) {
    try {


        const sql = `SELECT * FROM items`

        const data = db.query(sql)

        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({ status: "fail", message: err.message ?? err })
    }
});


router.get("/api/todos/:id", function (req, res) {
    try {

    } catch (err) {
        res.status(500).json({ status: "fail", message: err.message ?? err })
    }
})


module.exports = router