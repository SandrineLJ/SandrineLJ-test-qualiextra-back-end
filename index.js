import 'dotenv/config';
import express from "express";
import { router } from './app/router.js';
import cors from "cors";
import { xss } from 'express-xss-sanitizer';

const app = express();

app.use(cors());
app.use(express.json());
app.use(xss());

app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
})