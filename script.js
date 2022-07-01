const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const startBtn = $("[data-start]")
const start = $("#start")
const form = $("#form")
const backToStart = $(".back-btn")



startBtn.addEventListener('click', ()=>{
    start.classList.add('active')
    form.classList.remove('active')
})

backToStart.addEventListener('click', ()=>{
    start.classList.remove('active')
    form.classList.add('active')
})





$('form').addEventListener('submit', (e)=>{
    e.preventDefault()
})