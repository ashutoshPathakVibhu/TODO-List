clear = document.getElementById('clear');
clear.addEventListener('click', () => {
    if (confirm("Do you really want to clear?")) {
        localStorage.clear();
        getElements();
    }
});
function update() {
    console.log("Updating List....");
    tit = document.getElementById('title').value;
    desc = document.getElementById('description').value;
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = new Array();
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    else {
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    //Populate The Table
    let tableBody = document.getElementById("tableBody");
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
                    <tr>
                        <th scope="row">${index + 1}</th>
                        <td>${element[0]}</td>
                        <td>${element[1]}</td>
                        <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td>
                    </tr>`;
    });
    tableBody.innerHTML = str;
}
function getElements() {
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = new Array();
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    else {
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    //Populate The Table
    let tableBody = document.getElementById("tableBody");
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
                    <tr>
                        <th scope="row">${index + 1}</th>
                        <td>${element[0]}</td>
                        <td>${element[1]}</td>
                        <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td>
                    </tr>`;
    });
    tableBody.innerHTML = str;
}
add = document.getElementById('add');
add.addEventListener("click", update);
getElements();
function deleted(index) {
    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.splice(index, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    getElements();
}