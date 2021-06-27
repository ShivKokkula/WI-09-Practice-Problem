let isUpdate = false;
let employeePayRollObj = {};

window.addEventListener('DOMContentLoaded',(event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input',function(){
        if (!name.value || name.value == null || name.value == "" || name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayRollData()).name = name.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input',function(){
        output.textContent = salary.value;
    });

    checkForUpdate();
});

const save = () => {
    try {
        let employeePayRollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayRollData);
    } catch (e) {
        return;
    }
}

const createEmployeePayroll = () => {
    let employeePayRollData = new EmployeePayRollData();
    try {
        employeePayRollData.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.text-error',e);
        throw e;
    }
    employeePayRollData._id = new Date().getTime();
    employeePayRollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayRollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayRollData.department = getSelectedValues('[name=department]');
    employeePayRollData.salary = getInputValueById('#salary');
    employeePayRollData.note = getInputValueById('#note');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayRollData.startDate = new Date(date);
    alert(employeePayRollData.toString());
    return employeePayRollData;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

function createAndUpdateStorage(employeePayRollData) {
    let employeePayRollList = JSON.parse(localStorage.getItem("EmployeePayRollList"));

    if (employeePayRollList != undefined) {
        employeePayRollList.push(employeePayRollData);
    } else {
        employeePayRollList = [employeePayRollData];
    }
    alert(employeePayRollList.toString());
    localStorage.setItem("EmployeePayRollList",JSON.stringify(employeePayRollList));
}

const resetForm = () => {
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#note','');
    setSelectedIndex('#day',0);
    setSelectedIndex('#month',0);
    setSelectedIndex('#year',0);
}

const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
}

const unsetSelectedValues = (propertyValue) =>{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked  = false;
    });
}

const setTextValue = (id,value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value  = value;
}

const checkForUpdate = () => {
    const employeePayRollJSON = localStorage.getItem('editEmp');
    isUpdate = employeePayRollJSON ? true : false;
    if(!isUpdate) return;
    employeePayRollObj = JSON.parse(employeePayRollJSON);
    setForm();
}

const setForm = () => {
    setValue('#name', employeePayRollObj._name);
    setSelectedValues('[name=profile]',employeePayRollObj._profilePic);
    setSelectedValues('[name=gender]',employeePayRollObj._gender);
    setSelectedValues('[name=department]',employeePayRollObj._department);
    setValue('#salary',employeePayRollObj._salary);
    setTextValue('.salary-output',employeePayRollObj._salary);
    setValue('#note',employeePayRollObj._note);
    let date = stringyfydate(employeePayRollObj._startDate).split(" ");
    setValue('#day',date[0]);
    setValue('#month',date[1]);
    setValue('#year',date[2]);
}

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach( item => {
        if(Array.isArray(value)){
            if(value.includes(item.value)){
                item.checked = true;
            }
        }else if(item.value === value){
            item.checked = true;
        }
    });
}