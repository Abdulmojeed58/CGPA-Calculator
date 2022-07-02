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
const gradeLists = $(".grade-input ul")
const gradeListBtns = $$(".grade-input img")
const nameInput = $("[data-name]")
const add = $("[data-add]")
const semester = $("[data-semester]")
const grade = $("[data-grade]")


let currentSemester = 1


add.addEventListener('click', ()=>{
    currentSemester ++
    semester.innerHTML = currentSemester
})










gradeListBtns.forEach(gradeListBtn => {
    gradeListBtn.addEventListener('click', ()=>{
        gradeLists.classList.toggle('active')
        
    })
    
});

gradeLists.addEventListener('click', (e)=>{
    let gradePoint = e.target.textContent
    grade.value = gradePoint
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
        div.insertAdjacentHTML('afterend', '<p class="error">Name field cannot be empty</p>');
        return
    }
    welcome.innerHTML = `${nameInput.value}`
    load.classList.remove('active')
    setTimeout(()=>{
        cgpaForm.classList.remove('active')
        form.classList.add('active')
        load.classList.add('active')
    }, 1500)
    


})