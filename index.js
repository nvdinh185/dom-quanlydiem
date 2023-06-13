const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(__dirname + '/client'));

const students = [
    {
        id: 1,
        name: "Dinh",
        address: "hue",
        toan: 5,
        ly: 6,
        hoa: 7
    },
    {
        id: 2,
        name: "Nam",
        address: "quang nam",
        toan: 10,
        ly: 8,
        hoa: 5,
    },
    {
        id: 3,
        name: "Tan",
        address: "da nang",
        toan: 3,
        ly: 5,
        hoa: 5,
    },
    {
        id: 4,
        name: "Hung",
        address: "hue",
        toan: 9,
        ly: 7,
        hoa: 7,
    },
    {
        id: 5,
        name: "Tri",
        address: "quang tri",
        toan: 9,
        ly: 8,
        hoa: 9,
    },
    {
        id: 6,
        name: "Anh",
        address: "hue",
        toan: 9,
        ly: 10,
        hoa: 9,
    },
    {
        id: 7,
        name: "Binh",
        address: "da nang",
        toan: 7,
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

app.put('/students', (req, res) => {
    var edSt = req.body;
    var idx = students.findIndex(function (el) {
        return el.id == edSt.id;
    })

    students.splice(idx, 1, edSt);
    res.send('OK');
})

app.delete('/students/:id', (req, res) => {
    var id = req.params.id;
    var idx = students.findIndex(function (el) {
        return el.id == id;
    })

    students.splice(idx, 1);
    res.send('OK');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})