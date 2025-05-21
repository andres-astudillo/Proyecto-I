import RouterHelper from "../../helpers/router.helpers.js";

class CartRouter extends RouterHelper {
    constructor() {
        super();
        this.init();
    }
    init = () => {

    };
}

const cartsRouter = (new CartRouter()).getRouter();

export default cartsRouter;