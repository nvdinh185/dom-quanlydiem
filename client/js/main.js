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

    // Tiêu đề
    var htmlTitle = '';
    for (const key in arr[0]) {
        htmlTitle += `<th>${key}</th>`;
    }
    htmlTitle += `<th colspan=2>Chức năng</th>`;

    tbEl.innerHTML = '<thead><tr>' + htmlTitle + '</tr></thead>';

    // Nội dung
    var htmlBody = '<tbody>';
    arr.forEach(function (el) {
        var htmlContent = '<tr>';
        for (const key in el) {
            htmlContent += `<td>${el[key]}</td>`;
        }
        htmlContent += `<td><button onclick=editSt('${el.id}')>Sửa</button></td>`;
        htmlContent += `<td><button onclick=deleteSt('${el.id}')>Xóa</button></td>`;
        htmlContent += '</tr>';
        htmlBody += htmlContent;
    })
    htmlBody += '</tbody>';
    tbEl.innerHTML += htmlBody;
}

var edId;
function editSt(id) {
    edId = id;
    formElement.style.display = 'block';
    updateBtnElement.style.display = 'block';
    manageElement.style.display = 'none';
    addBtnElement.style.display = 'none';

    var idx = students.findIndex(function (el) {
        return el.id == id;
    })
    stName.value = students[idx].name;
    address.value = students[idx].address;
    toan.value = students[idx].toan;
    ly.value = students[idx].ly;
    hoa.value = students[idx].hoa;
}

async function deleteSt(id) {
    if (confirm("Bạn có chắc muốn xóa?")) {
        await axios({
            method: "DELETE",
            url: studentsApi + '/' + id,
            headers: { "Content-Type": "application/json" },
        })

        var idx = students.findIndex(function (el) {
            return el.id == id;
        })

        students.splice(idx, 1);
        renderHTML(students, tbElement);
    }
}

var addNewElement = document.querySelector('#add');
var manageElement = document.querySelector('#manage');
var formElement = document.forms['add-form'];

addNewElement.onclick = function () {
    formElement.style.display = 'block';
    addBtnElement.style.display = 'block';
    manageElement.style.display = 'none';
    updateBtnElement.style.display = 'none';
}

var addBtnElement = document.querySelector('#create');
var updateBtnElement = document.querySelector('#update');
var cancelBtnElement = document.querySelector('#cancel');
var stName = document.querySelector('input[name="name"]');
var address = document.querySelector('input[name="address"]');
var toan = document.querySelector('input[name="toan"]');
var ly = document.querySelector('input[name="ly"]');
var hoa = document.querySelector('input[name="hoa"]');

addBtnElement.onclick = async function (e) {
    e.preventDefault();

    const newSt = {
        id: generateUuid(),
        name: stName.value,
        address: address.value,
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
    resetForm();

    function generateUuid() {
        return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

updateBtnElement.onclick = async function (e) {
    e.preventDefault();

    const edSt = {
        id: edId,
        name: stName.value,
        address: address.value,
        toan: Number(toan.value),
        ly: Number(ly.value),
        hoa: Number(hoa.value)
    }

    await axios({
        method: "PUT",
        url: studentsApi,
        data: edSt,
        headers: { "Content-Type": "application/json" },
    })

    var idx = students.findIndex(function (el) {
        return el.id == edId;
    })

    students.splice(idx, 1, edSt);
    renderHTML(students, tbElement);

    resetForm();
}

cancelBtnElement.onclick = function (e) {
    e.preventDefault();
    resetForm();
}

function resetForm() {
    stName.value = '';
    address.value = '';
    toan.value = '';
    ly.value = '';
    hoa.value = '';
    formElement.style.display = 'none';
    manageElement.style.display = 'block';
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
    return arrStudents.filter(function (student) {
        return student.toan >= 8 && student.ly >= 8 && student.hoa >= 8;
    });
}

// 5. Hàm cộng cho mỗi sinh viên 1 điểm toán
function addOneMath(arrStudents) {
    arrStudents.forEach(function (student) {
        student.toan < 10 ? student.toan += 1 : '';
    });
}

// 6. Hàm thêm thuộc tính tổng điểm 3 môn
function addPropertySum(arrStudents) {
    arrStudents.forEach(function (student) {
        student.sum = student.toan + student.ly + student.hoa;
    })
}

//9. Hàm sắp xếp danh sách sinh viên theo tổng điểm tăng dần
function sortStudents(arrStudents) {

    function compare(a, b) {
        if (a.sum > b.sum) {
            return 1;
        }
        if (a.sum < b.sum) {
            return -1;
        }
        return 0;
    }

    arrStudents.sort(compare);
}