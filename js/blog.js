document.addEventListener("DOMContentLoaded", () => {

const POSTS_PER_PAGE = 3
const container = document.getElementById("blog-container")
const posts = Array.from(container.getElementsByClassName("blog-card"))
const pagination = document.getElementById("blog-pagination")
const countDisplay = document.getElementById("article-count")

const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

if(countDisplay){
countDisplay.textContent = `${posts.length} Articles`
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
posts.forEach((post, index) => {
post.style.display = "none"
if(index >= (page-1)*POSTS_PER_PAGE && index < page*POSTS_PER_PAGE){
post.style.display = "flex"
}
})
renderPagination(page)
}

function renderPagination(currentPage){
pagination.innerHTML = ""

for(let i = 1; i <= totalPages; i++){
const btn = document.createElement("button")
btn.textContent = i
btn.className = "blog-page-btn"
if(i === currentPage){
btn.classList.add("active")
}
btn.addEventListener("click", () => {
updateURL(i)
renderPage(i)
})
pagination.appendChild(btn)
}
}

window.addEventListener("popstate", () => {
renderPage(getPageFromURL())
})

renderPage(getPageFromURL())

})