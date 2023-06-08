const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(__dirname + '/client'));

const students = [
    {
        id: 1,
        name: "Dinh",
        toan: 5,
        ly: 6,
        hoa: 7
    },
    {
        id: 2,
        name: "Nam",
        toan: 10,
        ly: 8,
        hoa: 5,
    },
    {
        id: 3,
        name: "Tan",
        toan: 3,
        ly: 5,
        hoa: 5,
    },
    {
        id: 4,
        name: "Hung",
        toan: 9,
        ly: 7,
        hoa: 7,
    },
    {
        id: 5,
        name: "Tri",
        toan: 9,
        ly: 8,
        hoa: 9,
    },
    {
        id: 6,
        name: "Anh",
        toan: 9,
        ly: 10,
        hoa: 9,
    },
    {
        id: 7,
        name: "Binh",
        toan: 3,
        ly: 8,
        hoa: 9,
    }
]

app.get('/students', (req, res) => {
    res.send(students);
})

app.post('/students', (req, res) => {
    students.push(req.body);
    res.send('OK');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})