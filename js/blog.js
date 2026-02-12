document.addEventListener("DOMContentLoaded",()=>{

const POSTS_PER_PAGE=3
const container=document.getElementById("blog-container")
if(!container) return

const posts=[...container.getElementsByClassName("blog-card")]
const pagination=document.getElementById("blog-pagination")
const countDisplay=document.getElementById("article-count")

if(posts.length===0) return

const totalPages=Math.ceil(posts.length/POSTS_PER_PAGE)

if(countDisplay){
countDisplay.textContent=`${posts.length} Articles`
}

const clamp=v=>Math.max(1,Math.min(totalPages,v))

const getPage=()=>{
const p=parseInt(new URLSearchParams(location.search).get("page"))
return clamp(isNaN(p)?1:p)
}

const setURL=p=>{
const url=new URL(location)
url.searchParams.set("page",p)
history.pushState({}, "", url)
}

const renderPage=p=>{
const start=(p-1)*POSTS_PER_PAGE
const end=start+POSTS_PER_PAGE

posts.forEach((post,i)=>{
post.style.display=i>=start&&i<end?"flex":"none"
})

renderPagination(p)
window.scrollTo({top:0,behavior:"smooth"})
}

const renderPagination=current=>{
if(!pagination||totalPages<=1) return

pagination.innerHTML=""

const createBtn=(label,page,disabled=false,active=false)=>{
const btn=document.createElement("button")
btn.textContent=label
btn.className="blog-page-btn"
if(active) btn.classList.add("active")
if(disabled) btn.disabled=true
btn.addEventListener("click",()=>{
if(disabled||page===current) return
setURL(page)
renderPage(page)
})
return btn
}

pagination.appendChild(createBtn("Prev",current-1,current===1))

for(let i=1;i<=totalPages;i++){
pagination.appendChild(createBtn(i,i,false,i===current))
}

pagination.appendChild(createBtn("Next",current+1,current===totalPages))
}

window.addEventListener("popstate",()=>renderPage(getPage()))

renderPage(getPage())

})