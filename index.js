import 'dotenv/config';
import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send('hello world');
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
})