var currentIndex = 1;
var imageWidth = 640;
var transitionTime = 500;
var holdTime = 5000;
var factor = 10;

var carousel = document.querySelector('.carousel');
var imagesList = document.querySelector('.img-list');
var count = document.querySelectorAll('.img-list img').length; //number of images in slide
var maxMargin = -(count - 1) * imageWidth //maximum margin carousel can get.

imagesList.style.display = 'flex';
imagesList.style.marginLeft = '0px';

/*
    Add control div to the carousel
    - Slide Left Button 
    - Slide Right Button
*/

var controls = document.createElement('div')
controls.classList.add('controls')
imagesList.appendChild(controls)

var leftBtn = document.createElement('div')
leftBtn.classList.add('left-btn')
controls.appendChild(leftBtn)

var rightBtn = document.createElement('div')
rightBtn.classList.add('right-btn')
controls.appendChild(rightBtn)

/* 
    Div for the bottom index dots.
    Count images and add respective dots.
*/

var dotsContainer = document.createElement('div')
dotsContainer.classList.add('dot-bar')
dotsContainer.style.textAlign = 'center';

for (var i = 0; i < count; i++) {
    var dot = document.createElement('div')
    dot.classList.add('dot')
    dot.setAttribute('index', i + 1)
    dot.addEventListener('click', function (i) {
        slideOperation(i.target.getAttribute('index'))
    })
    dotsContainer.appendChild(dot)
}

controls.appendChild(dotsContainer)


/*
    Shows Controls on mouse hover only.
*/
imagesList.addEventListener('mouseover', function () {
    controls.style.display = 'block';
})
imagesList.addEventListener('mouseout', function () {
    controls.style.display = 'none';
})

/*
    Control Buttons click event.
*/

rightBtn.addEventListener('click', function () {
    slideOperation(currentIndex + 1)
})
leftBtn.addEventListener('click', function () {
    slideOperation(currentIndex - 1)
})

/*     
    Update Current Index
    Update index dots.
*/

function slideOperation(value) {
    if (value <= 0) {
        currentIndex = count
    } else if (value > count) {
        currentIndex = 1
    } else {
        currentIndex = value;
    }
    var finalWidth = -(currentIndex - 1) * imageWidth;
    transitionEffect(finalWidth)

    var dotLists = document.querySelectorAll('.dot');
    for (i = 0; i < count; i++) {
        if (i == currentIndex - 1) {
            dotLists[i].classList.add('active')
        } else {
            dotLists[i].classList.remove('active')
        }
    }
}

/*
    Animate the Slide Transition
*/

function transitionEffect(final) {
    var initialMargin = parseInt(getComputedStyle(imagesList).marginLeft);
    var step = (initialMargin - final) / factor;
    var transitInterval = setInterval(function () {
        var marginValue = parseInt(getComputedStyle(imagesList).marginLeft);

        /* Boundary Conditions 
           Reset values on exceeding min-max margin.
        */
        if (marginValue > 0) {
            imagesList.style.marginLeft = '0px';
            currentIndex = 1;
            clearInterval(transitInterval);
        } else if (marginValue < maxMargin) {
            imagesList.style.marginLeft = maxMargin + 'px';
            currentIndex = count - 1;
            clearInterval(transitInterval);
        } else if (marginValue == final) {
            clearInterval(transitInterval)
        } else {
            imagesList.style.marginLeft = marginValue - step + 'px';
        }
    }, (transitionTime / factor))
}

/*
    Auto Transition on certain interval
*/
setInterval(function () {
    slideOperation(currentIndex + 1)
}, holdTime)