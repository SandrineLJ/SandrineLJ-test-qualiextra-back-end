import 'dotenv/config';
import express from "express";
import { router } from './app/router.js';

const app = express();

app.use(express.json());

app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
})