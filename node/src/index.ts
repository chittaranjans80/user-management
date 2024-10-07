import express, { Express, Request, Response, NextFunction } from "express";
import { connect } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import router from "./routes/users-route";
import HttpError from "./models/http-error";

dotenv.config();

const CLIENT_URI: string = process.env.CLIENT_URI || "";
const port = process.env.PORT || 5000;

const app: Express = express();

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

// Connect to MongoDB
connect(CLIENT_URI).then(() => {
  app.listen(port);
}).catch(() => {
  console.log('Error occured in connecting to Database');
});
