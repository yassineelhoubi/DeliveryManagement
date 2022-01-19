export {
    loginAdmin,

} from "./adminController"

const logout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: "Logout"
    })
}
export { logout }