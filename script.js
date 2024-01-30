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
    newPalette.addEventListener('mouseup', (e) => {
        navigator.clipboard.writeText(e.target.innerText);
        toggleCopyMessage(e.target);
    })
    paletteGrid.appendChild(newPalette);
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

function generatePaletteColors() {
    let palette = [];

    //Pick random starting color
    let startingHue = Math.floor(Math.random() * 360);
    let startingSaturation = mapValue(0, 100, 20, 80, Math.random() * 100);
    let startingBrightness = mapValue(0, 100, 35, 80, Math.random() * 100);
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
            colorChosen = {
                hue: startingHue,
                saturation: startingSaturation,
                brightness: startingBrightness,
            }
        }
        else {
            colorChosen = {
                hue: startingHue,
                saturation: startingSaturation,
                brightness: startingBrightness,
            }
        }

        //Define random color based on base color chosen
        let randomHue;
        let randomSaturation;
        let randomBrightness;
        let colorChangeMin = 5;
        let colorChangeMax = 15;
        let colorChangeRange = 10;
        if (Math.random() > 0.5) {
            randomHue = colorChosen.hue + mapValue(0, 15, colorChangeMin, colorChangeMax, Math.random() * colorChangeRange);
        }
        else {
            randomHue = colorChosen.hue - mapValue(0, 15, colorChangeMin, colorChangeMax, Math.random() * colorChangeRange);
        }
        if (Math.random() > 0.5) {
            randomSaturation = colorChosen.saturation + mapValue(0, colorChangeRange, colorChangeMin, colorChangeMax, Math.random() * colorChangeRange);
        }
        else {
            randomSaturation = colorChosen.saturation - mapValue(0, colorChangeRange, colorChangeMin, colorChangeMax, Math.random() * colorChangeRange);
        }
        if (Math.random() > 0.5) {
            randomBrightness = colorChosen.brightness + mapValue(0, colorChangeRange, colorChangeMin, colorChangeMax, Math.random() * colorChangeRange);
        }
        else {
            randomBrightness = colorChosen.brightness - mapValue(0, colorChangeRange, colorChangeMin, colorChangeMax, Math.random() * colorChangeRange);
        }
        palette.push({ hue: randomHue, saturation: randomSaturation, brightness: randomBrightness });
    }
    palette.forEach((color) => {
        if (color.brightness > 60 || color.saturation > 70) color.textColor = 'black';
        else color.textColor = 'white';
        console.log(color);
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