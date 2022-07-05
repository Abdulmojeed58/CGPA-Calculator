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
const reset = $("[data-reset]")
const calculateSpin = $("[data-calculate] span")
const error = $(".error")
const courseInputs = $(".course-input")
const addCourses = $(".add-course")
const courses = $("#courses")
const gradePointAve = $(".grade-point-ave")
const cumGradePointAve = $(".cum-grade-point-ave")
const totalCourses = $(".total-courses")
const totalCreditUnits = $(".total-credit-units")
const loading = $(".loading")

let currentSemester = 1
let isGpa = true
let cgpaArr = []




//// CALCULATE FOR ANOTHER SEMESTER //////
add.addEventListener('click', ()=>{
    currentSemester ++
    semester.innerHTML = currentSemester
    isGpa = false
    resetOne()
    courses.value = 2
    addCourseItems()

    // cgpaArr.push(currentSemester)
    // console.log(cgpaArr)

})


////// ADD COURSES //////////
function addCourseItems(){
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
}

addCourses.addEventListener("click", addCourseItems)




// ///////// SHOW GRADE LIST /////////

courseInputs.addEventListener('click', (e)=>{
    let id = e.target.dataset.id
    let gradeList = document.getElementById(id)
    if(e.target.classList.contains('down')) {
        gradeList.classList.toggle('active')
        
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
            case '':
                obj.grade = 0
                break;
            // default:
            //     obj.grade = 10
            //     break;
        }

        let g = obj.unit * obj.grade
        box.push(g)
        unit.push(obj.unit)
    })
    let gradeTotal = box.reduce((total,current)=>total+current)
    let totalUnit = unit.reduce((total,current)=>total+current)
    // let gradeAve = Math.floor((gradeTotal/totalUnit)*100)/100
    gradeAve = gradeTotal/totalUnit;

    totalCreditUnits.innerHTML = `Total Credit Units: ${totalUnit}`

    
}


 function totalGpa(){
    let arr = []
    let allCourses = [...courseInputs.children]
    allCourses.forEach(child=>{
        let unit = Number(child.firstElementChild.nextElementSibling.value)

        let grades = child.lastElementChild.previousElementSibling.firstElementChild.value.toUpperCase();

        arr.push({unit:unit, grade:grades})

        cgpaArr.push({unit:unit, grade:grades})
    })

    totalCourses.innerHTML = `Total Courses: ${arr.length}`
    
    
        calculateGpa(arr)
        // console.log(arr)
        // console.log(gradeAve)
        if(isNaN(gradeAve)) gradeAve = 0.00
        gradePointAve.innerHTML = gradeAve.toFixed(2)  
        if(cumGradePointAve.textContent == 0.00){
            cumGradePointAve.innerHTML = gradeAve.toFixed(2)
        }
    
    
        console.log(cgpaArr)
        console.log(gradeAve)
        if(!isGpa) {
            calculateGpa(cgpaArr)
        if(isNaN(gradeAve)) gradeAve = 0.00
        cumGradePointAve.innerHTML = gradeAve.toFixed(2)
        // isGpa = true
    }
    // console.log(isGpa)

}



calculateBtn.addEventListener('click', ()=>{
    
    calculateSpin.innerHTML = ''
    loading.classList.remove('active')
    setTimeout(()=>{
        loading.classList.add('active')
        calculateSpin.innerHTML = 'Calculate'
        totalGpa()

    }, 1500)

})

///// RESET /////////
function resetOne(){
    let allCourses = [...courseInputs.children]
    allCourses.forEach(child=>{
        child.firstElementChild.nextElementSibling.value = '';
        
        child.firstElementChild.value = '';

        child.lastElementChild.previousElementSibling.firstElementChild.value = '';

        gradePointAve.innerHTML = (0.00).toFixed(2)

        totalCreditUnits.innerHTML = `Total Credit Units:`

        totalCourses.innerHTML = `Total Courses:`

    })

    // console.log('reset')
}



reset.addEventListener('click', resetOne)

/// RESET ALL TO DEFAULT //////
reset.addEventListener('dblclick', ()=>{
    resetOne();
    cumGradePointAve.innerHTML = (0.00).toFixed(2)
    cgpaArr = []
    currentSemester = 1
    semester.innerHTML = currentSemester
    courses.value = 2
    addCourseItems()
})



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

