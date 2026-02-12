document.addEventListener("DOMContentLoaded", () => {

const PROJECTS_PER_PAGE = 3
const container = document.getElementById("work-container")
const projects = Array.from(container.getElementsByClassName("work-card"))
const pagination = document.getElementById("work-pagination")
const countDisplay = document.getElementById("work-count")

if(!container || projects.length === 0) return

const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE)

if(countDisplay){
countDisplay.textContent = `${projects.length} Projects`
}

function getPageFromURL(){
const params = new URLSearchParams(window.location.search)
const page = parseInt(params.get("page"))
return page && page > 0 && page <= totalPages ? page : 1
}

function updateURL(page){
const url = new URL(window.location)
url.searchParams.set("page", page)
window.history.pushState({}, "", url)
}

function renderPage(page){

projects.forEach((project, index) => {
project.style.display = "none"
if(index >= (page - 1) * PROJECTS_PER_PAGE &&
   index < page * PROJECTS_PER_PAGE){
project.style.display = "flex"
}
})

renderPagination(page)
}

function renderPagination(currentPage){

pagination.innerHTML = ""
if(totalPages <= 1) return

const prev = document.createElement("button")
prev.textContent = "Prev"
prev.className = "work-page-btn"
prev.disabled = currentPage === 1
prev.addEventListener("click", () => {
if(currentPage > 1){
updateURL(currentPage - 1)
renderPage(currentPage - 1)
}
})
pagination.appendChild(prev)

for(let i = 1; i <= totalPages; i++){
const btn = document.createElement("button")
btn.textContent = i
btn.className = "work-page-btn"
if(i === currentPage){
btn.classList.add("active")
}
btn.addEventListener("click", () => {
updateURL(i)
renderPage(i)
})
pagination.appendChild(btn)
}

const next = document.createElement("button")
next.textContent = "Next"
next.className = "work-page-btn"
next.disabled = currentPage === totalPages
next.addEventListener("click", () => {
if(currentPage < totalPages){
updateURL(currentPage + 1)
renderPage(currentPage + 1)
}
})
pagination.appendChild(next)
}

window.addEventListener("popstate", () => {
renderPage(getPageFromURL())
})

renderPage(getPageFromURL())

})