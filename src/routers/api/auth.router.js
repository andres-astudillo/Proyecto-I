import passportCB from "../../middlewares/passportCB.middlewares.js";
import RouterHelper from "../../helpers/router.helpers.js";

const registerCB = async (req, res) => {
    const { _id } = req.user;
    res.json201(_id, "Registered!");
};

const loginCB = async (req, res) => {
    const { _id } = req.user;
    const opts = { maxAge: 24 * 60 * 60 * 1000 };
    res.cookie("token", req.user.token, opts).json200(_id, "Logged In Success!!!");
};

const signOutCB = async (req, res) => res.clearCookie("token").json200(req.user._id, "Sign out successful!");

const badAuthCB = (req, res) => res.json401();

const forbiddenCB = (req, res) => res.json403();

const currentCB = async (req, res) => res.json200(req.user.role, "User is online!!!");

class AuthRouter extends RouterHelper {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        this.create("/register", ["PUBLIC"], passportCB("register"), registerCB);
        this.create("/login", ["PUBLIC"], passportCB("login"), loginCB);
        this.create("/signout", ["USER", "ADMIN"], signOutCB);
        this.create("/current", ["USER", "ADMIN"], currentCB);
        this.read("/bad-auth", ["PUBLIC"], badAuthCB);
        this.read("/forbidden", ["PUBLIC"], forbiddenCB);
        /*Google*/
        this.read("/google", ["PUBLIC"], passportCB("google", { scope: ["email", "profile"] }));
        this.read("/google/redirect", ["PUBLIC"], passportCB("google"), loginCB);
    };
};

const authRouter = (new AuthRouter()).getRouter();

export default authRouter;