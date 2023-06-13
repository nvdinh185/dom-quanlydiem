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
    htmlTitle += `<th colspan=2>Chức năng</th>`;

    tr1Element.innerHTML = htmlTitle;
    tbEl.appendChild(tr1Element);

    // Nội dung
    arr.forEach(function (el) {
        const tr2Element = document.createElement('tr');

        var htmlContent = '';
        for (const key in el) {
            htmlContent += `<td>${el[key]}</td>`;
        }
        htmlContent += `<td><button onclick=editSt('${el.id}')>Sửa</button></td>`;
        htmlContent += `<td><button onclick=deleteSt('${el.id}')>Xóa</button></td>`;

        tr2Element.innerHTML = htmlContent;

        tbEl.appendChild(tr2Element);

    })
}

var edId;
function editSt(id) {
    edId = id;
    formElement.style.display = 'block';
    updateBtnElement.style.display = 'block';
    addNewElement.style.display = 'none';
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
var formElement = document.forms['add-form'];

addNewElement.onclick = function () {
    formElement.style.display = 'block';
    addBtnElement.style.display = 'block';
    addNewElement.style.display = 'none';
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
    addNewElement.style.display = 'block';
}