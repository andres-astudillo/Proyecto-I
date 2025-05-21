import EXPRESS from "express";
import "dotenv/config.js";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import morgan from "morgan";
import pathHandler from "./src/middlewares/pathHandler.middlewares.js";
import errorHandler from "./src/middlewares/errorHandler.middlewares.js";
import indexRouter from "./src/routers/index.router.js";
import dbConnect from "./src/helpers/db.Connect.helpers.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

/* Server Settings*/
const SERVER = EXPRESS();
const PORT = process.env.PORT || 8080;
const ready = async () => {
    await dbConnect(process.env.LINK_MONGODB);
    console.log(`Server ready on port ${PORT}`);
};
SERVER.listen(PORT, ready);

/* Engine Settings */
SERVER.engine("handlebars", engine());
SERVER.set("view engine", "handlebars");
SERVER.set("views", __dirname + "/src/views"); 

/* Middlewares Settings */
SERVER.use(cookieParser(process.env.SECRET));
SERVER.use(EXPRESS.json());
SERVER.use(EXPRESS.urlencoded( { extended: true } ));
SERVER.use(EXPRESS.static("public"));
SERVER.use(morgan("dev"));

/* Sessions Settings */
SERVER.use(
    session({
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true,
        cookies: { maxAge: 60 * 1000 },
        store: new MongoStore( {
            mongoUrl: process.env.LINK_MONGODB,
        }),
    })
);

/* Router Settings */
SERVER.use("/", indexRouter);
SERVER.use(errorHandler);
SERVER.use(pathHandler);