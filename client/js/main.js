const studentsApi = "http://localhost:3000/students";
const students = [];

const tbElement = document.querySelector('#tbl');
async function getData() {
    var listStudents = await axios.get(studentsApi);
    students.push.apply(students, listStudents.data);

    renderHTML(students, tbElement);
}
getData();

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

var addElement = document.querySelector('#add');
var manageElement = document.querySelector('#manage');
var formElement = document.forms['add-form'];

addElement.onclick = function () {
    formElement.style.display = 'block';
    manageElement.style.display = 'none';
}

var addBtnElement = document.querySelector('#create');
var cancelBtnElement = document.querySelector('#cancel');
var stName = document.querySelector('input[name="name"]');
var toan = document.querySelector('input[name="toan"]');
var ly = document.querySelector('input[name="ly"]');
var hoa = document.querySelector('input[name="hoa"]');

addBtnElement.onclick = async function (e) {
    e.preventDefault();

    const newSt = {
        id: generateUuid(),
        name: stName.value,
        toan: Number(toan.value),
        ly: Number(ly.value),
        hoa: Number(hoa.value)
    }

    await axios({
        method: "POST",
        url: studentsApi,
        data: newSt,
        headers: { "Content-Type": "application/json" },
    })

    students.push(newSt);
    renderHTML(students, tbElement);
    stName.value = '';
    toan.value = '';
    ly.value = '';
    hoa.value = '';
    formElement.style.display = 'none';
    manageElement.style.display = 'block';

    function generateUuid() {
        return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

cancelBtnElement.onclick = function (e) {
    e.preventDefault();
    stName.value = '';
    toan.value = '';
    ly.value = '';
    hoa.value = '';
    formElement.style.display = 'none';
    manageElement.style.display = 'block';
}