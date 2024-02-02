function generateComplementaryPalette() {
    let palette = [];
    //Pick random starting color
    let startingHue = Math.floor(Math.random() * 360);
    let startingSaturation = mapValue(0, 100, 30, 100, Math.random() * 100);
    let startingBrightness = mapValue(0, 100, 30, 80, Math.random() * 100);
    palette.push({ hue: startingHue, saturation: startingSaturation, brightness: startingBrightness });

    //Define complementary color
    let complementaryHue = Math.abs(startingHue + 180 % 360);
    let complementarySaturation = startingSaturation;
    let complementaryBrightness = startingBrightness;
    palette.push({ hue: complementaryHue, saturation: complementarySaturation, brightness: complementaryBrightness });

    let colorOptions = [];
    //Generate tints, tones, and shades for starting color
    let valToIterate = 5;
    for (let i = 0; i < 5; i++) {
        //Generate tints
        colorOptions.push({ hue: startingHue, saturation: startingSaturation - valToIterate, brightness: startingBrightness });
        //Generate tones
        colorOptions.push({ hue: startingHue, saturation: startingSaturation - valToIterate, brightness: startingBrightness - valToIterate });
        //Generate shades
        colorOptions.push({ hue: startingHue, saturation: startingSaturation, brightness: startingBrightness - valToIterate });
        valToIterate += 5;
    }

    //Generate tints, tones, and shades for complementary color
    valToIterate = 5;
    for (let i = 0; i < 5; i++) {
        //Generate tints
        colorOptions.push({ hue: complementaryHue, saturation: complementarySaturation - valToIterate, brightness: complementaryBrightness });
        //Generate tones
        colorOptions.push({ hue: complementaryHue, saturation: complementarySaturation - valToIterate, brightness: complementaryBrightness - valToIterate });
        //Generate shades
        colorOptions.push({ hue: complementaryHue, saturation: complementarySaturation, brightness: complementaryBrightness - valToIterate });
        valToIterate += 5;
    }

    //Select 3 of the generated colors randomly for palette
    for (let i = 0; i < 3; i++) {
        let colorSelected = Math.floor(Math.random() * (colorOptions.length - 1));
        palette.push({ hue: colorOptions[colorSelected].hue, saturation: colorOptions[colorSelected].saturation, brightness: colorOptions[colorSelected].brightness });
        colorOptions.splice(colorSelected, 1);
    }
    return palette;
}

function generateMonochromaticPalette() {
    let palette = [];
    //Pick random starting color
    let startingHue = Math.floor(Math.random() * 360);
    let startingSaturation = mapValue(0, 100, 50, 100, Math.random() * 100);
    let startingBrightness = mapValue(0, 100, 50, 70, Math.random() * 100);
    palette.push({ hue: startingHue, saturation: startingSaturation, brightness: startingBrightness });

    let tintOptions = [];
    let toneOptions = [];
    let shadeOptions = [];
    //Generate tints, tones, and shades for starting color
    let valToIterateInitial = 10 + Math.floor(Math.random() * 2.4);
    let valToIterate = valToIterateInitial;
    for (let i = 0; i < 4; i++) {
        //Generate tints
        tintOptions.push({ hue: startingHue, saturation: Math.max(0, startingSaturation - valToIterate), brightness: Math.max(0, startingBrightness) });
        //Generate tones
        toneOptions.push({ hue: startingHue, saturation: Math.max(0, startingSaturation - valToIterate), brightness: Math.max(0, startingBrightness - valToIterate) });
        //Generate shades
        shadeOptions.push({ hue: startingHue, saturation: Math.max(0, startingSaturation), brightness: Math.max(0, startingBrightness - valToIterate) });
        valToIterate += valToIterateInitial;
    }

    let randomOption = Math.floor(Math.random() * 2.99);
    let chosenOption;
    switch(randomOption) {
        case 0:
            palette.push(...tintOptions);
            break;
        case 1:
            palette.push(...toneOptions);
            break;
        case 2:
            palette.push(...shadeOptions);
            break;
    }
    return palette;
}

function generateAnalogousPalette() {
    let palette = [];
    //Pick random starting color
    let startingHue = Math.floor(Math.random() * 360);
    let startingSaturation = mapValue(0, 100, 40, 100, Math.random() * 100);
    let startingBrightness = mapValue(0, 100, 40, 70, Math.random() * 100);
    palette.push({ hue: startingHue, saturation: startingSaturation, brightness: startingBrightness });

    let valToIterate = 5 + Math.floor(Math.random() * 25);
    for (let i = 0; i < 4; i++) {
        let newHue = Math.abs(startingHue + valToIterate % 360);
        palette.push({ hue: newHue, saturation: startingSaturation, brightness: startingBrightness });
        valToIterate += 20;
    }

    return palette;
}

function generateRandomPalette() {
    let paletteTypes = 3;
    let indexChosen = Math.floor(Math.random() * 2.99);
    switch(indexChosen) {
        case 0:
            return generateComplementaryPalette();
        case 1:
            return generateMonochromaticPalette();
        case 2:
            return generateAnalogousPalette();
    }
}