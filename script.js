let mainContainer = document.querySelector('#container');
let itemSize = document.querySelector('#item-size');
let itemSizeValue = document.querySelector('#item-size-value');
let currentMode = document.querySelector('#current-mode');
let colorWheel = document.querySelector('#color-wheel');
let noGridLines = document.querySelector('#no-grid-lines');
let btns = document.querySelectorAll('.btn');
let gridLineColorWheel = document.querySelector('#grid-line-color-wheel');
let gridBackgroundColorWheel = document.querySelector('#background-color-wheel');
let btnReset = document.querySelector('#btn-reset');
let colourMode = "black";
let currentGridLineColor = 'black';
let currentBackgroundColor = 'white';

// default container layout
function defaultContainer () {
    createDivs(50);
    hoverItems();
}

// create divs for layout
function createDivs (gridSize) {
    let itemsNumbers = 600 / gridSize;

    for (let i = 0; i < itemsNumbers; i++) {
        for (let j = 0; j < itemsNumbers; j++) {
            let div = document.createElement('div');
            div.classList.add('item');
            div.style.width = `${gridSize}px`;
            div.style.height = `${gridSize}px`;
            div.style.border = `1px solid ${currentGridLineColor}`
            div.style.backgroundColor = currentBackgroundColor;
            mainContainer.appendChild(div);
        }
        
    }
}
defaultContainer();

// change layout by user range value
itemSize.addEventListener('change', (e) => {
    if (mainContainer.childElementCount > 0) {
        while (mainContainer.firstChild) {
            mainContainer.removeChild(mainContainer.firstChild);
        }
    }
    itemSizeValue.textContent = `${e.target.value} x ${e.target.value}`;
    createDivs(e.target.value);
    hoverItems();
})

// change grid line color
gridLineColorWheel.addEventListener('change',(e) => {
    let color = gridLineColorWheel.value;
    let items = document.querySelectorAll('.item');
    items.forEach(item => item.style.border = `1px solid ${color}`);
    currentGridLineColor = color;
});

// change background item color
gridBackgroundColorWheel.addEventListener('change', (e) => {
    let color = gridBackgroundColorWheel.value;
    let items = document.querySelectorAll('.item');
    items.forEach(item => item.style.backgroundColor = color);
    currentBackgroundColor = color;
});

// no grid line
noGridLines.addEventListener("click", () => {
    let items = document.querySelectorAll('.item');
    items.forEach(item => item.style.border = "none")
});

// reset the layout
btnReset.addEventListener('click', (e) => {
    let items = document.querySelectorAll('.item');
    items.forEach(item => {
        item.style.backgroundColor = currentBackgroundColor;
        item.style.border = `1px solid ${currentGridLineColor}`;
    });
   
})

// change hover color mode
btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        colourMode = e.target.id;
        currentMode.textContent = e.target.textContent;
    })
});

// generate random color
function generateRandomColor() {
    function randomColorNum () {
        let randomNum = Math.floor(Math.random() * (255 + 1));
        return randomNum;
    }
    let r = randomColorNum();
    let g = randomColorNum();
    let b = randomColorNum();
    let randomColor = `rgb(${r},${g},${b})`;
    return randomColor;
}


// get all color by indexally from array
let shadedColorCount = 0;
let blueShadedColor = ["#A9D6E5","#89C2D9","#61A5C2","#468FAF","#2C7DA0","#2A6F97","#014F86","#01497C","#013A63","#012A4A"];

function getShadedColor () {
    if (shadedColorCount === 10 ) {
        shadedColorCount = 0;
    }
    let shadedColor = blueShadedColor[shadedColorCount];
    shadedColorCount++ ;
    return shadedColor;
}

// change hovered item background color 
function hoverItems () {
    let items = document.querySelectorAll('.item');
    items.forEach((item) => {
        item.style.cursor = "cell";
        item.addEventListener('mouseenter', (e) => {
            switch (colourMode) {
                case "black":
                    e.target.style.backgroundColor = "black";
                break;
                case "custom-color":
                    let color =  colorWheel.value;
                    e.target.style.backgroundColor = color;
                break;
                case "random-color":
                    e.target.style.backgroundColor = generateRandomColor();
                break;
                case "blue-shades":
                    e.target.style.backgroundColor = getShadedColor();
                break;
                case "eraser":
                    e.target.style.backgroundColor = "white"
                break;
                case "default":
                    e.target.style.backgroundColor = "cyan";
                break;
            }
        })
    });
}


