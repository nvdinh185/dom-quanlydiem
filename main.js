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
];

const tbElement = document.querySelector('#tbl');

renderHTML(students, tbElement);

function renderHTML(arr, tbEl) {

    tbEl.innerHTML = '';
    // Tiêu đề
    const tr1Element = document.createElement('tr');

    var htmlTitle = '';
    for (const key in arr[0]) {
        htmlTitle += `<th>${key}</th>`;
    }

    tr1Element.innerHTML = htmlTitle;
    tbEl.appendChild(tr1Element);

    // Nội dung
    arr.forEach(function (el) {
        const tr2Element = document.createElement('tr');

        var htmlContent = '';
        for (const key in el) {
            htmlContent += `<td>${el[key]}</td>`
        }

        tr2Element.innerHTML = htmlContent;

        tbEl.appendChild(tr2Element);

    })
}
const filterElement = document.querySelector('#filter');
const addOneMathElement = document.querySelector('#addOneMath');
const addPropertyElement = document.querySelector('#addProperty');
const sortElement = document.querySelector('#sort');

filterElement.onclick = function () {
    renderHTML(filterGoodStudents(students), tbElement);
}

addOneMathElement.onclick = function () {
    addOneMath(students);
    renderHTML(students, tbElement);
}

addPropertyElement.onclick = function () {
    addPropertySum(students);
    renderHTML(students, tbElement);
}

sortElement.onclick = function () {
    sortStudents(students);
    renderHTML(students, tbElement);
}

// 3. Hàm lọc ra các sinh viên xếp loại giỏi
function filterGoodStudents(arrStudents) {
    var listStudents = [];
    for (const student of arrStudents) {
        if ((student.toan >= 8 && student.ly >= 8 && student.hoa >= 8)) {
            listStudents.push(student);
        }
    }
    return listStudents;
}

// 5. Hàm cộng cho mỗi sinh viên 1 điểm toán
function addOneMath(arrStudents) {
    for (const student of arrStudents) {
        student.toan < 10 ? student.toan += 1 : '';
    }
}

// 6. Hàm thêm thuộc tính tổng điểm 3 môn
function addPropertySum(arrStudents) {
    for (const student of arrStudents) {
        student.sum = student.toan + student.ly + student.hoa;
    }
}

//9. Hàm sắp xếp danh sách sinh viên theo tổng điểm tăng dần
function sortStudents(arrStudents) {

    var size = arrStudents.length;

    for (var i = 0; i < size - 1; i++) {
        for (var j = 0; j < size - i - 1; j++) {
            if (arrStudents[j].sum > arrStudents[j + 1].sum) {
                var temp = arrStudents[j];
                arrStudents[j] = arrStudents[j + 1];
                arrStudents[j + 1] = temp;
            }
        }
    }
}