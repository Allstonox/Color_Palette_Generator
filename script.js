let paletteNumber = 40;
let paletteGrid = document.querySelector('#palettes');
let copyMessage = document.querySelector('#copy-message');
let currentPaletteType = 'random';

function generateNewPalette(paletteType = 'random') {
    let newPaletteWrapper = document.createElement('div');
    let newPalette = document.createElement('div');
    let optionsPanel = document.createElement('div');;
    newPaletteWrapper.classList.add('palette-wrapper');
    newPalette.classList.add('palette');
    optionsPanel.classList.add('options-panel');
    let paletteColors = generatePaletteColors(paletteType);
    newPalette.innerHTML = `
            <div class="palette-color" style="background-color: hsl(${paletteColors[0].hue}, ${paletteColors[0].saturation}%, ${paletteColors[0].brightness}%);">
                <div class="color-hexcode" style="color: ${paletteColors[0].textColor}">${hslToHex(paletteColors[0].hue, paletteColors[0].saturation, paletteColors[0].brightness)}</div>
            </div>
            <div class="palette-color" style="background-color: hsl(${paletteColors[1].hue}, ${paletteColors[1].saturation}%, ${paletteColors[1].brightness}%);">
                <div class="color-hexcode" style="color: ${paletteColors[1].textColor}">${hslToHex(paletteColors[1].hue, paletteColors[1].saturation, paletteColors[1].brightness)}</div>
            </div>
            <div class="palette-color" style="background-color: hsl(${paletteColors[2].hue}, ${paletteColors[2].saturation}%, ${paletteColors[2].brightness}%);">
                <div class="color-hexcode" style="color: ${paletteColors[2].textColor}">${hslToHex(paletteColors[2].hue, paletteColors[2].saturation, paletteColors[2].brightness)}</div>
            </div>
            <div class="palette-color" style="background-color: hsl(${paletteColors[3].hue}, ${paletteColors[3].saturation}%, ${paletteColors[3].brightness}%);">
                <div class="color-hexcode" style="color: ${paletteColors[3].textColor}">${hslToHex(paletteColors[3].hue, paletteColors[3].saturation, paletteColors[3].brightness)}</div>
            </div>
            <div class="palette-color" style="background-color: hsl(${paletteColors[4].hue}, ${paletteColors[4].saturation}%, ${paletteColors[4].brightness}%);">
                <div class="color-hexcode" style="color: ${paletteColors[4].textColor}">${hslToHex(paletteColors[4].hue, paletteColors[4].saturation, paletteColors[4].brightness)}</div>
            </div>
    `;
    newPalette.addEventListener('mouseup', (e) => {
        navigator.clipboard.writeText(e.target.innerText);
        toggleCopyMessage(e.target);
    })
    optionsPanel.innerHTML =`<ion-icon name="heart-outline"></ion-icon>
                            <ion-icon onclick="togglePaletteInformation(this.parentElement.previousElementSibling, 0, true)" name="ellipsis-horizontal"></ion-icon>`;
    newPaletteWrapper.appendChild(newPalette);
    newPaletteWrapper.appendChild(optionsPanel);
    paletteGrid.appendChild(newPaletteWrapper);
}

// function generatePaletteColors() {
//     let palette = [];

//     //Pick random starting color
//     let startingHue = Math.floor(Math.random() * 360);
//     let startingSaturation = mapValue(0, 100, 20, 80, Math.random() * 100);
//     let startingBrightness = mapValue(0, 100, 35, 80, Math.random() * 100);
//     palette.push({ hue: startingHue, saturation: startingSaturation, brightness: startingBrightness });

//     //Define complementary color
//     let complementaryHue = Math.abs(startingHue + 180 % 360);
//     let complementarySaturation = startingSaturation;
//     let complementaryBrightness = startingBrightness;
//     palette.push({ hue: complementaryHue, saturation: complementarySaturation, brightness: complementaryBrightness });

//     //Define other 3 colors by picking base color randomly between main and complementary
//     for (let i = 0; i < 3; i++) {
//         let colorChosen;
//         if (Math.random() > 0.5) {
//             colorChosen = {
//                 hue: startingHue,
//                 saturation: startingSaturation,
//                 brightness: startingBrightness,
//             }
//         }
//         else {
//             colorChosen = {
//                 hue: complementaryHue,
//                 saturation: complementarySaturation,
//                 brightness: complementaryBrightness,
//             }
//         }

//         //Define random color based on base color chosen
//         let randomHue;
//         let randomSaturation;
//         let randomBrightness;
//         let colorChangeMin = 5;
//         let colorChangeMax = 15;
//         let colorChangeRange = 10;
//         if (Math.random() > 0.5) {
//             randomHue = colorChosen.hue + mapValue(0, 15, colorChangeMin, colorChangeMax, Math.random() * colorChangeRange);
//         }
//         else {
//             randomHue = colorChosen.hue - mapValue(0, 15, colorChangeMin, colorChangeMax, Math.random() * colorChangeRange);
//         }
//         if (Math.random() > 0.5) {
//             randomSaturation = colorChosen.saturation + mapValue(0, colorChangeRange, colorChangeMin, colorChangeMax, Math.random() * colorChangeRange);
//         }
//         else {
//             randomSaturation = colorChosen.saturation - mapValue(0, colorChangeRange, colorChangeMin, colorChangeMax, Math.random() * colorChangeRange);
//         }
//         if (Math.random() > 0.5) {
//             randomBrightness = colorChosen.brightness + mapValue(0, colorChangeRange, colorChangeMin, colorChangeMax, Math.random() * colorChangeRange);
//         }
//         else {
//             randomBrightness = colorChosen.brightness - mapValue(0, colorChangeRange, colorChangeMin, colorChangeMax, Math.random() * colorChangeRange);
//         }
//         palette.push({ hue: randomHue, saturation: randomSaturation, brightness: randomBrightness });
//     }
//     palette.forEach((color) => {
//         if (color.brightness > 60 || color.saturation > 70) color.textColor = 'black';
//         else color.textColor = 'white';
//         console.log(color);
//     })
//     return palette;
// }

function generatePaletteColors(paletteType = 'random') {
    let palette = [];
    switch (paletteType) {
        case 'complementary':
            palette = generateComplementaryPalette();
            break;
        case 'monochromatic':
            palette = generateMonochromaticPalette();
            break;
        case 'analogous':
            palette = generateAnalogousPalette();
            break;
        case 'random':
            palette = generateRandomPalette();
            break;
    }

    palette.forEach((color) => {
        if (color.brightness > 60 || color.saturation > 70) color.textColor = 'black';
        else color.textColor = 'white';
        // console.log(color);
    })
    return palette;
}

for (let i = 0; i < paletteNumber; i++) {
    generateNewPalette();
}

function toggleMenu(menuToToggle) {
    let menu = document.querySelector(menuToToggle);
    menu.classList.toggle('visible');
}

let copyMessageToggled = false;
function toggleCopyMessage(paletteClicked) {
    let originalInnerHTML = paletteClicked.innerHTML;
    let paletteTextColor = paletteClicked.children[0].style.color;
    if (!copyMessageToggled) {
        paletteClicked.innerHTML = `<ion-icon class="color-hexcode" name="checkmark-outline" style="width: 30px; height: 30px; color: ${paletteTextColor}"></ion-icon>`;
        copyMessage.classList.toggle('slide-fade');
        copyMessageToggled = true;
        window.setTimeout(() => {
            paletteClicked.innerHTML = originalInnerHTML;
            copyMessage.classList.toggle('slide-fade');
            copyMessageToggled = false
        }, 2000)
    }
}

function toggleMenu(menuToToggle) {
    let menu = document.querySelector(menuToToggle);
    menu.classList.toggle('visible');
}

function togglePaletteInformation(paletteToDisplay, colorSelected = 0, toggle = false) {
    let paletteInformation = document.querySelector('#palette-information');
    let paletteInformationBody = document.querySelector('#palette-information-body');
    let paletteItemsWrapper = document.querySelector('#palette-items-wrapper');
    let paletteItemSelected = document.querySelector('#palette-item-selected');
    let colors = [...paletteToDisplay.children];
    let textColor = colors[colorSelected].children[0].style.color;

    paletteItemsWrapper.innerHTML = '';
    console.log(colors);
    for(let color of colors) {
        let colorToAdd = document.createElement('div');
        colorToAdd.classList.add('palette-item');
        colorToAdd.style.backgroundColor = `${color.style.backgroundColor}`;
        colorToAdd.style.cursor = 'pointer';
        colorToAdd.addEventListener('mouseup', (e) => {
            togglePaletteInformation(paletteToDisplay, colors.indexOf(color));
        })
        paletteItemsWrapper.appendChild(colorToAdd);
    }

    paletteInformationBody.style.backgroundColor = colors[colorSelected].style.backgroundColor;
    paletteInformationBody.innerHTML = `
    <div>
        <p style="color: var(--light-text); font-size: 0.8rem; font-weight: 600;">NAME</p>
        <p style="font-weight: 600; color: ${textColor}">Spicy Green</p>
    </div>
    <div>
        <p style="color: var(--light-text); font-size: 0.8rem; font-weight: 600;">HEX</p>
         <p style="font-weight: 600; color: ${textColor}">${colors[colorSelected].children[0].innerText}</p>
    </div>
    <div>
        <p style="color: var(--light-text); font-size: 0.8rem; font-weight: 600;">HSB</p>
        <p style="font-weight: 600; color: ${textColor}">25, 45, 234</p>
    </div>
    <div>
        <p style="color: var(--light-text); font-size: 0.8rem; font-weight: 600;">HSL</p>
        <p style="font-weight: 600; color: ${textColor}">${colors[colorSelected].style.backgroundColor}</p>
    </div>
    <div>
        <p style="color: var(--light-text); font-size: 0.8rem; font-weight: 600;">RGB</p>
        <p style="font-weight: 600; color: ${textColor}">100, 22, 212</p>
    </div>`

    paletteItemSelected.style.color = textColor;
    paletteItemSelected.style.left = `calc(14% + ${colorSelected * 18}%)`
    if(toggle) paletteInformation.classList.toggle('visible');
}

function selectPaletteType(paletteTypeChosen) {
    let paletteMenu = document.querySelector('#palette-menu');
    paletteGrid.innerHTML = '';
    switch (paletteTypeChosen) {
        case 'complementary':
            for (let i = 0; i < paletteNumber; i++) {
                generateNewPalette();
                currentPaletteType = 'complementary';
                paletteMenu.innerHTML = `<li onclick="selectPaletteType('complementary')">Complementary <ion-icon name="checkmark-outline" style="color: grey;"></ion-icon></li>
                <li onclick="selectPaletteType('monochromatic')">Monochromatic</li>
                <li onclick="selectPaletteType('analogous')">Analogous</li>
                <li onclick="selectPaletteType('random')">Random</li>`;
            }
            break;
        case 'monochromatic':
            for (let i = 0; i < paletteNumber; i++) {
                generateNewPalette('monochromatic');
                currentPaletteType = 'monochromatic';
                paletteMenu.innerHTML = `<li onclick="selectPaletteType('complementary')">Complementary</li>
                <li onclick="selectPaletteType('monochromatic')">Monochromatic <ion-icon name="checkmark-outline" style="color: grey;"></ion-icon></li>
                <li onclick="selectPaletteType('analogous')">Analogous</li>
                <li onclick="selectPaletteType('random')">Random</li>`;
            }
            break;
        case 'analogous':
            for (let i = 0; i < paletteNumber; i++) {
                generateNewPalette('analogous');
                currentPaletteType = 'analogous';
                paletteMenu.innerHTML = `<li onclick="selectPaletteType('complementary')">Complementary</li>
                <li onclick="selectPaletteType('monochromatic')">Monochromatic</li>
                <li onclick="selectPaletteType('analogous')">Analogous <ion-icon name="checkmark-outline" style="color: grey;"></ion-icon></li>
                <li onclick="selectPaletteType('random')">Random</li>`;
            }
            break;
        case 'random':
            for (let i = 0; i < paletteNumber; i++) {
                generateNewPalette('random');
                currentPaletteType = 'random';
                paletteMenu.innerHTML = `<li onclick="selectPaletteType('complementary')">Complementary</li>
                <li onclick="selectPaletteType('monochromatic')">Monochromatic</li>
                <li onclick="selectPaletteType('analogous')">Analogous</li>
                <li onclick="selectPaletteType('random')">Random  <ion-icon name="checkmark-outline" style="color: grey;"></ion-icon></li>`;
            }
            break;
    }
    paletteMenu.classList.toggle('visible');
}

window.onscroll = function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // you're at the bottom of the page
        for (let i = 0; i < paletteNumber; i++) {
            generateNewPalette(currentPaletteType);
        }
    }
};

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}