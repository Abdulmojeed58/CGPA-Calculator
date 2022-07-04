const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const startBtn = $("[data-start]")
const start = $("#start")
const form = $("#form")
const backToStart = $(".back-btn")
const backToForm = $(".back-btn2")
const cgpaForm = $(".cgpa-field")
const welcome = $(".welcome")
const load = $(".modal")
const div = $(".input")
const gradeListBtns = $$(".grade-input img")
const nameInput = $("[data-name]")
const add = $("[data-add]")
const semester = $("[data-semester]")
const grade = $("[data-grade]")
const calculateBtn = $("[data-calculate]")
const error = $(".error")
const courseInputs = $(".course-input")
const addCourses = $(".add-course")
const courses = $("#courses")
const gradePointAve = $(".grade-point-ave")
const totalCourses = $(".total-courses")
const totalCreditUnits = $(".total-credit-units")


let currentSemester = 1


add.addEventListener('click', ()=>{
    currentSemester ++
    semester.innerHTML = currentSemester
})


////// ADD COURSES //////////
addCourses.addEventListener("click", ()=>{
    let uniqueId = new Date().getTime()

    courseInputs.innerHTML = ''

    for(let i=0; i<courses.value; i++) {
        courseInputs.innerHTML += `
        <div class="input1">
                            <input type="text" placeholder="e.g Course 1">
    
                            <input type="text" placeholder="e.g 1">
    
                            <div class="grade-input">
                                <input type="text" placeholder="A" data-grade>
                                <img src="./images/Vector (1).svg" alt="" data-id="${uniqueId + i}" class="down">

                                <ul class="active grade-ul" id="${uniqueId + i}">
                                    <li class="gradePoint">A</li>
                                    <li  class="gradePoint">B</li>
                                    <li  class="gradePoint">C</li>
                                    <li class="gradePoint">D</li>
                                    <li class="gradePoint">E</li>
                                    <li class="gradePoint">F</li>
                                </ul>
                            </div>
    
                            <div class="del">
                                <img src="./images/Group 1.svg" alt="" class="delete">
                            </div>
    
                        </div>
        `
        // let a = `<p>lax</p>`
        // console.log(a)
    }
})




// ///////// SHOW GRADE LIST /////////

courseInputs.addEventListener('click', (e)=>{
    let id = e.target.dataset.id
    let gradeList = document.getElementById(id)
    if(e.target.classList.contains('down')) {
        gradeList.classList.toggle('active')
        console.log(id)
        
    } 
    if (e.target.classList.contains('gradePoint')){
        let input = e.target.parentElement.previousElementSibling.previousElementSibling;
        input.value = e.target.textContent
    }

    if(e.target.classList.contains('delete')) {
        e.target.parentElement.parentElement.remove()
        courses.value -= 1
        totalGpa()
    }

})

function calculateGpa(arr){
    let box = []
    let unit =[]
    arr.forEach(obj=>{
        switch(obj.grade){
            case 'A':
                obj.grade = 5
                break;
            case 'B':
                obj.grade = 4
                break;
            case 'C':
                obj.grade = 3
                break;
            case 'D':
                obj.grade = 2
                break;
            case 'E':
                obj.grade = 1
                break;
            case 'F':
                obj.grade = 0
                break;
            default:
                obj.grade = 0
                break;
        }

        let g = obj.unit * obj.grade
        box.push(g)
        unit.push(obj.unit)
    })
    let gradeTotal = box.reduce((total,current)=>total+current)
    let totalUnit = unit.reduce((total,current)=>total+current)
    // let gradeAve = Math.floor((gradeTotal/totalUnit)*100)/100
    let gradeAve = gradeTotal/totalUnit
    if(isNaN(gradeAve)) gradeAve = 0.00
    gradePointAve.innerHTML = gradeAve.toFixed(2)
    totalCreditUnits.innerHTML = `Total Credit Units: ${totalUnit}`
}


 function totalGpa(){
    let arr = []
    let allCourses = [...courseInputs.children]
    allCourses.forEach(child=>{
        let unit = Number(child.firstElementChild.nextElementSibling.value)

        let grades = child.lastElementChild.previousElementSibling.firstElementChild.value.toUpperCase();

        arr.push({unit:unit, grade:grades})
    })

    totalCourses.innerHTML = `Total Courses: ${arr.length}`
    // if(){

    // }
    calculateGpa(arr)
}

calculateBtn.addEventListener('click', totalGpa)

startBtn.addEventListener('click', ()=>{
    load.classList.remove('active')
    setTimeout(()=>{
        start.classList.add('active')
        form.classList.remove('active')
        load.classList.add('active')
    }, 1500)
})

backToStart.addEventListener('click', ()=>{
    load.classList.remove('active')
    setTimeout(()=>{
        start.classList.remove('active')
        form.classList.add('active')
        load.classList.add('active')
    }, 1500)
})

backToForm.addEventListener('click', ()=>{
    load.classList.remove('active')
    setTimeout(()=>{
        cgpaForm.classList.add('active')
        form.classList.remove('active')
        load.classList.add('active')
    }, 1500)
})



$('form').addEventListener('submit', (e)=>{
    e.preventDefault()
    if(!nameInput.value) {
        error.innerHTML = 'Name field cannot be empty';
        return
    }
    error.innerHTML = '';
    welcome.innerHTML = `${nameInput.value}`
    load.classList.remove('active')
    setTimeout(()=>{
        cgpaForm.classList.remove('active')
        form.classList.add('active')
        load.classList.add('active')
    }, 1500)
    


})