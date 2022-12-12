import "reflect-metadata";

import Express, { request, response } from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from "express";

import 'dotenv/config';

import { AppRoutes } from "./routes";
import { connectDB } from './database';

import cors = require('cors');

const { checkSchema, validationResult } = require("express-validator");

const app = Express()

app.use(cors(
    {
        credentials: true,
        origin: 'http://localhost:4200',
        optionsSuccessStatus: 200,
    }));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

AppRoutes.forEach( (route) => {
    app.use(
        route.path,
        checkSchema(route.schema),
        (req: Request, res: Response, next: Function) => {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.json(validationResult(request).array());
            }
            route
                .action(req, res)
                .then(() => next)
                .catch((err: any) => next(err));
        }
    );
});



const startServer = async () => {

    await app.listen(process.env.PORT || 8080, () => {
    console.log(
    `Server running on http://127.0.0.1:${
    process.env.PORT }`
    );
    // onsole.log("a");
    });
};

(async () => {
    await  connectDB();
    await startServer();
})();
