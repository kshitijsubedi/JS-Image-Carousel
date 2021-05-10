var currentIndex = 1;
var imageWidth = 640;
var transitionTime = 5;
var holdTime = 3;

var carousel = document.querySelector('.carousel');
var imglist = document.querySelector('.img-list');

imglist.style.display='flex';
imglist.style.marginLeft='0px';

var controls = document.createElement('div')
controls.classList.add('controls')
imglist.appendChild(controls)

var leftBtn = document.createElement('div')
leftBtn.classList.add('left-btn')
controls.appendChild(leftBtn)

var rightBtn = document.createElement('div')
rightBtn.classList.add('right-btn')
controls.appendChild(rightBtn)

var dotBar = document.createElement('div')
dotBar.classList.add('dot-bar')
dotBar.style.textAlign='center';
var count = document.querySelectorAll('.img-list img').length;
for (var i=0; i<count;i++){
    var dot = document.createElement('div')
    dot.classList.add('dot')
    dot.setAttribute('index',i+1)
    dot.addEventListener('click',function(i){
        mgvalue(i.target.getAttribute('index'))
    })
    dotBar.appendChild(dot)
}

controls.appendChild(dotBar)

imglist.addEventListener('mouseover',function(){
   controls.style.display='block';
})
imglist.addEventListener('mouseout',function(){
    controls.style.display='block';
})

rightBtn.addEventListener('click',function(){
    mgvalue(currentIndex+1)
})
leftBtn.addEventListener('click',function(){
   mgvalue(currentIndex-1)
})

function mgvalue (value){
    if(value<=0){currentIndex=count}
    else if (value>count){currentIndex=1}
    else{currentIndex=value;}
    var finalWidth=-(currentIndex-1)*imageWidth;
    transitionEffect(finalWidth)
    var dotLists = document.querySelectorAll('.dot');
    for(i=0;i<count;i++){
        if(i==currentIndex-1) {
            dotLists[i].classList.add('active')
        }
        else {
            dotLists[i].classList.remove('active')
        }
    }
}

function transitionEffect (final) {
    var Initialmargin = parseInt(getComputedStyle(imglist).marginLeft);
    var step = (Initialmargin-final)/transitionTime;
    var transitInterval = setInterval(function(){
        var marginValue = parseInt(getComputedStyle(imglist).marginLeft);
        if (marginValue == final) {
            clearInterval(transitInterval)
            console.log(marginValue,final)
        }
        else{
            imglist.style.marginLeft=marginValue-step+'px';
        }
    },100)
}