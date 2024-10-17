import express, { Express, Request, Response, NextFunction } from "express";
import { connect } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import router from "./routes/users-route";
import HttpError from "./models/http-error";

dotenv.config();

// Reads CLIENT_URI value from .env file configuration
const CLIENT_URI: string = process.env.CLIENT_URI || "";

// Reads PORT value from .env file configuration
const port = process.env.PORT || 5000;

const app: Express = express();

/**
 * Customize options for CORS middleware
 **/
var options = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
app.use(cors(options));

app.use(router);

app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  if(res.headersSent) {
    return next(error)
  }
  res.status(error.code || 500);
  res.json({
    message: error.message || 'An unknown error occured'
  });
});

/**
 * Connect to MongoDB instance based on configured value from .env file
 * If the connection is successful, subscribe to the app listner on the provided port number
 **/

connect(CLIENT_URI).then(() => {
  app.listen(port);
}).catch(() => {
  console.log('Error occured in connecting to Database');
});
