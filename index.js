
const clr_but = document.getElementById("clear")
const conv_el = document.getElementById("conv_el")
// const my_div = document.getElementById("mydiv")
const lnk_inp = document.getElementById("lnk_inp")
const sub_but = document.getElementById("sub_but")
const gen_but = document.getElementById("gen_txtr")
const dwld_but = document.getElementById("dwnld")

pts1 = []
pts2 = []
var img = new Image()
var ctx = conv_el.getContext('2d')
let ht = conv_el.clientHeight, wd = conv_el.clientWidth

try {
    var canvas = fx.canvas();
} catch (e) {
    alert(e);
   
}

let texture
img.onload = function(){
    
    wd = conv_el.width = img.width
    ht = conv_el.height = img.height
    ctx.clearRect(0, 0, wd, ht)
    texture = canvas.texture(img)
    ctx.drawImage(img, 0, 0)
}
img.onerror = function(){
    ctx.clearRect(0, 0, wd, ht)
    ctx.fillText("No Image", wd/2, ht/2)
}


sub_but.addEventListener("click", function(){
    img.src = lnk_inp.value
})

gen_but.addEventListener("click", function(){
    if (pts1.length==8){
        
        canvas.draw(texture).perspective([pts1[0], pts1[1], pts1[2], pts1[3], pts1[4], pts1[5], pts1[6], pts1[7]], [0, 0, wd, 0, wd, ht,  0, ht]).update();
        img.src = canvas.toDataURL('image/png')
        console.log(img.src)
        dwld_but.innerHTML = '<a href='+img.src+' download="image">Download Image'
    }
    else{
        alert("Select 4 Points")
    }
})


ctx.fillStyle = 'rgb(255, 0, 0)'
ctx.beginPath()
clr_but.addEventListener("click", function(){
    ctx.clearRect(0, 0, wd, ht)
    ctx.drawImage(img, 0, 0)
    ctx.beginPath()
    pts_cnt = 0
    pts1.length = 0
})
let x1 = null, y1, x2, y2, m_fl = 0, pts_cnt = 0

let framex = 400 
let framey = 400 
let buffx = 0
let buffy = 0

conv_el.addEventListener("click", function(event){
    framex = 400 
    framey = 400 
    buffx = 0
    buffy = 0
    if(wd>ht){
        framey = (ht/wd)*framex
        buffy = (framex-framey)/2
    }
    else if(ht>wd){
        framex = (wd/ht)*framey
        buffx = (framey-framex)/2
    }
    console.log(event.offsetX, event.offsetY)
    x1 = Math.floor((event.offsetX-buffx)*(wd/framex))
    y1 = Math.floor((event.offsetY-buffy)*(ht/framey))
    if((x1<0)||(y1<0)) return
    if(pts_cnt<4){
        pts_cnt++
        m_fl = 1
        pts1.push(x1, y1)
        ctx.arc(x1, y1, 5, 0, 2 * Math.PI);
        if(pts_cnt>1) {
            ctx.lineTo(Math.floor((event.offsetX-buffx)*(wd/framex)), Math.floor((event.offsetY-buffy)*(ht/framey)))
        }
        if(pts_cnt==4){
            ctx.moveTo(x1, y1)
            ctx.lineTo(pts1[0], pts1[1])
        }
        ctx.stroke();

    }
    
    if(pts_cnt==4){
        m_fl = 0;
    }
    ctx.moveTo(x1, y1)


})

