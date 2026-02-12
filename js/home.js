gsap.registerPlugin(ScrollTrigger)

const duelContainer=document.getElementById('duel-container')
const duelModern=document.getElementById('duel-modern')
const duelSlider=document.getElementById('duel-slider')
const toggleLegacy=document.getElementById('toggle-legacy')
const toggleModern=document.getElementById('toggle-modern')

function setSplit(p){
const v=Math.max(0,Math.min(100,p))
if(duelModern)duelModern.style.clipPath=`inset(0 0 0 ${v}%)`
if(duelSlider)duelSlider.style.left=`${v}%`
}

if(window.innerWidth>=768 && duelContainer){
let active=false
duelSlider.addEventListener('mousedown',()=>active=true)
window.addEventListener('mouseup',()=>active=false)
window.addEventListener('mousemove',e=>{
if(!active)return
const r=duelContainer.getBoundingClientRect()
setSplit(((e.clientX-r.left)/r.width)*100)
})
setSplit(50)
}

if(window.innerWidth<768 && duelModern){
duelModern.style.display='none'
if(toggleLegacy)toggleLegacy.addEventListener('click',()=>{
duelModern.style.display='none'
})
if(toggleModern)toggleModern.addEventListener('click',()=>{
duelModern.style.display='flex'
})
}

gsap.from('.duel-container',{
scrollTrigger:{
trigger:'.duel-container',
start:'top 80%'
},
opacity:0,
y:60,
duration:1,
ease:'power3.out'
})