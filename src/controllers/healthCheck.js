
const health = (req, res) => {
    res.status(200).json({
        message: "Server is Working"
    })
}
export {
    health
}