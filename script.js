let paletteNumber = 40;
let paletteGrid = document.querySelector('#palettes');
let copyMessage = document.querySelector('#copy-message');
let likeMessage = document.querySelector('#like-message');
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
        toggleCopy(e.target, toggle = true);
    })
    optionsPanel.innerHTML = `<ion-icon onclick="toggleLikes(this)" name="heart-outline"></ion-icon>
                            <ion-icon onclick="togglePaletteInformation(this.parentElement.previousElementSibling, 0, true)" name="ellipsis-horizontal"></ion-icon>`;
    newPaletteWrapper.appendChild(newPalette);
    newPaletteWrapper.appendChild(optionsPanel);
    paletteGrid.appendChild(newPaletteWrapper);
}

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
        if (color.saturation > 50 && color.brightness > 30) color.textColor = 'black';
        else color.textColor = 'white';
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
function toggleCopy(paletteClicked, toggle = false) {
    if (toggle) {
        let originalInnerHTML = paletteClicked.innerHTML;
        let paletteTextColor = paletteClicked.children[0].style.color;
        if (!copyMessageToggled) {
            navigator.clipboard.writeText(paletteClicked.innerText);
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
    else {
        if (!copyMessageToggled) {
            navigator.clipboard.writeText(paletteClicked.children[1].innerText);
            paletteClicked.setAttribute('data-content', 'Copied!');
            copyMessageToggled = true;
            window.setTimeout(() => {
                paletteClicked.setAttribute('data-content', 'Copy');
                copyMessageToggled = false
            }, 2000)
        }
    }
}

function toggleMenu(menuToToggle) {
    let menu = document.querySelector(menuToToggle);
    menu.classList.toggle('visible');
}

async function togglePaletteInformation(paletteToDisplay, colorSelected = 0, toggle = false) {
    let paletteInformation = document.querySelector('#palette-information');
    let paletteInformationBody = document.querySelector('#palette-information-body');
    let paletteItemsWrapper = document.querySelector('#palette-items-wrapper');
    let paletteItemSelected = document.querySelector('#palette-item-selected');
    let colors = [...paletteToDisplay.children];
    let textColor = colors[colorSelected].children[0].style.color;
    let colorHexadecimalVal = colors[colorSelected].children[0].innerText;

    let content = await fetchColorInformation(colorHexadecimalVal);
    paletteInformationBody.innerHTML = `
    <div data-content="Copy" onclick="toggleCopy(this)">
        <p style="color: var(--light-text); font-size: 0.8rem; font-weight: 600;">NAME</p>
        <p style="font-weight: 600; color: ${textColor};">${content.colorName}</p>
    </div>
    <div data-content="Copy" onclick="toggleCopy(this)">
        <p style="color: var(--light-text); font-size: 0.8rem; font-weight: 600;">HEX</p>
         <p style="font-weight: 600; color: ${textColor};">${content.colorHex}</p>
    </div>
    <div data-content="Copy" onclick="toggleCopy(this)">
        <p style="color: var(--light-text); font-size: 0.8rem; font-weight: 600;">HSV</p>
        <p style="font-weight: 600; color: ${textColor};">${content.colorHSB}</p>
    </div>
    <div data-content="Copy" onclick="toggleCopy(this)">
        <p style="color: var(--light-text); font-size: 0.8rem; font-weight: 600;">HSL</p>
        <p style="font-weight: 600; color: ${textColor};">${content.colorHSL}</p>
    </div>
    <div data-content="Copy" onclick="toggleCopy(this)">
        <p style="color: var(--light-text); font-size: 0.8rem; font-weight: 600;">RGB</p>
        <p style="font-weight: 600; color: ${textColor};">${content.colorRGB}</p>
    </div>`

    paletteItemsWrapper.innerHTML = '';
    for (let color of colors) {
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
    paletteItemSelected.style.color = textColor;
    paletteItemSelected.style.left = `calc(14% + ${colorSelected * 18}%)`
    if (toggle) paletteInformation.classList.toggle('visible');
}

async function fetchColorInformation(color) {
    // construct the API url with the color parameter
    let url = `https://www.thecolorapi.com/id?hex=${color}`;

    try {
        const response = await fetch(url)
        const data = await response.json()
        let name = data.name.value;
        let hex = data.hex.value;
        let hsb = data.hsv.value;
        let hsl = data.hsl.value;
        let rgb = data.rgb.value;
        return { colorName: name, colorHex: hex, colorHSB: hsb, colorHSL: hsl, colorRGB: rgb };
    } catch (err) {
        console.log(err)
    }
}

let likeMessageToggled = false;
let likedPalettes;
if(localStorage.getItem('Likes')) likedPalettes = JSON.parse(localStorage.getItem('Likes'));
else likedPalettes = [];
function toggleLikes(heartSelected) {
    if (heartSelected.name === 'heart-outline' && !likeMessageToggled) {
        likedPalettes.push(heartSelected.closest('.options-panel').previousSibling);
        localStorage.setItem('Likes', JSON.stringify(likedPalettes));
        heartSelected.name = 'heart';
        heartSelected.style.color = 'pink';
        likeMessage.innerHTML = 'Palette added to likes!';
        likeMessage.classList.toggle('slide-fade');
        likeMessageToggled = true;
        window.setTimeout(() => {
            likeMessage.classList.toggle('slide-fade');
            likeMessageToggled = false;
        }, 2000)
    }
    else if(!likeMessageToggled) {
        likedPalettes.splice(likedPalettes.indexOf(heartSelected.closest('.options-panel').previousSibling), 1);
        localStorage.setItem('Likes', JSON.stringify(likedPalettes));
        heartSelected.name = 'heart-outline';
        heartSelected.style.color = 'var(--light-text)';
        likeMessage.innerHTML = 'Palette removed from likes!';
        likeMessage.classList.toggle('slide-fade');
        likeMessageToggled = true;
        window.setTimeout(() => {
            likeMessage.classList.toggle('slide-fade');
            likeMessageToggled = false;
        }, 2000)
    }
}

function selectPaletteType(paletteTypeChosen) {
    let paletteMenu = document.querySelector('#palette-menu');
    paletteGrid.innerHTML = '';
    switch (paletteTypeChosen) {
        case 'complementary':
            for (let i = 0; i < paletteNumber; i++) {
                generateNewPalette('complementary');
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