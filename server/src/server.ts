import express from 'express';

const app = express();

app.use(express.json());

app.get('/users', (req, res) => {
     const users = [
         {name: 'Diego', age: 22},
         {name: 'Tooin', age: 24}
     ];

     return res.json(users);
});

app.listen(3333);