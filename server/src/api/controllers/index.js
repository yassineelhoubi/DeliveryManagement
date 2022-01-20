export {
    loginAdmin,

} from "./adminController"

export {
    registerManager
} from "./managerController"

const logout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: "Logout"
    })
}
export { logout }