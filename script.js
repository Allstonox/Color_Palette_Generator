let paletteNumber = 50;
let paletteGrid = document.querySelector('#palettes');
let copyMessage = document.querySelector('#copy-message');

function generateNewPalette() {
    let newPalette = document.createElement('div');
    newPalette.classList.add('palette');
    let paletteColors = generatePaletteColors();
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
    newPalette.addEventListener('click', (e) => {
        navigator.clipboard.writeText(e.target.innerText);
        toggleCopyMessage(e.target);
    })
    paletteGrid.appendChild(newPalette);
}

let copyMessageToggled = false;
function toggleCopyMessage(paletteClicked) {
    let colorValue = paletteClicked.innerText;
    if(!copyMessageToggled) {
        paletteClicked.innerHTML = `<ion-icon class="color-hexcode" name="checkmark-outline" style="width: 30px; height: 30px"></ion-icon>`;
        copyMessage.classList.toggle('slide-fade');
        copyMessageToggled = true;
        window.setTimeout(() => {
            paletteClicked.innerHTML = `<div class="color-hexcode">${colorValue}</div>`;
            copyMessage.classList.toggle('slide-fade');
            copyMessageToggled = false
        }, 2000)
    }
}

function generatePaletteColors() {
    let palette = [];

    //Pick random starting color
    let startingHue = Math.floor(Math.random() * 360);
    let startingSaturation = mapValue(0, 100, 20, 80, Math.random() * 100);
    let startingBrightness = mapValue(0, 100, 20, 80, Math.random() * 100);
    palette.push({ hue: startingHue, saturation: startingSaturation, brightness: startingBrightness });

    //Define complementary color
    let complementaryHue = Math.abs(startingHue + 180 % 360);
    let complementarySaturation = startingSaturation;
    let complementaryBrightness = startingBrightness;
    palette.push({ hue: complementaryHue, saturation: complementarySaturation, brightness: complementaryBrightness });

    //Define other 3 colors by picking base color randomly between main and complementary
    for (let i = 0; i < 3; i++) {
        let colorChosen;
        if (Math.random() > 0.5) {
            colorChosen = 'main';
        }
        else {
            colorChosen = 'complementary';
        }

        //Define random color based on base color chosen
        let randomHue;
        let randomSaturation;
        let randomBrightness;
        let colorChangeVal = 15;
        if (colorChosen === 'main') {
            if (Math.random() > 0.5) {
                randomHue = startingHue + Math.floor(Math.random() * colorChangeVal);
            }
            else {
                randomHue = startingHue - Math.floor(Math.random() * colorChangeVal);
            }
            if (Math.random() > 0.5) {
                randomSaturation = startingSaturation + Math.floor(Math.random() * colorChangeVal);
            }
            else {
                randomSaturation = startingSaturation - Math.floor(Math.random() * colorChangeVal);
            }
            if (Math.random() > 0.5) {
                randomBrightness = startingBrightness + Math.floor(Math.random() * colorChangeVal);
            }
            else {
                randomBrightness = startingBrightness - Math.floor(Math.random() * colorChangeVal);
            }
            palette.push({ hue: randomHue, saturation: randomSaturation, brightness: randomBrightness });
        }

        else {
            if (Math.random() > 0.5) {
                randomHue = complementaryHue + Math.floor(Math.random() * colorChangeVal);
            }
            else {
                randomHue = complementaryHue - Math.floor(Math.random() * colorChangeVal);
            }
            if (Math.random() > 0.5) {
                randomSaturation = complementarySaturation + Math.floor(Math.random() * colorChangeVal);
            }
            else {
                randomSaturation = complementarySaturation - Math.floor(Math.random() * colorChangeVal);
            }
            if (Math.random() > 0.5) {
                randomBrightness = complementaryBrightness + Math.floor(Math.random() * colorChangeVal);
            }
            else {
                randomBrightness = complementaryBrightness - Math.floor(Math.random() * colorChangeVal);
            }
            palette.push({ hue: randomHue, saturation: randomSaturation, brightness: randomBrightness });
        }
    }
    palette.forEach((color) => {
        if(color.brightness > 70) color.textColor = 'black';
        else color.textColor = 'white';
    })
    return palette;
}

for (let i = 0; i < paletteNumber; i++) {
    generateNewPalette();
}

window.onscroll = function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // you're at the bottom of the page
        for (let i = 0; i < paletteNumber; i++) {
            generateNewPalette();
        }
    }
};