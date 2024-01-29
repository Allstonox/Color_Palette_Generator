function constrain(value, minVal, maxVal) {
    return Math.min(Math.max(value, maxVal), minVal);
}

function hslToHex(h, s, l) {
    // Convert the inputs to numbers
    h = Number(h);
    s = Number(s);
    l = Number(l);

    // Normalize the inputs to the range [0, 1]
    h = h % 360 / 360;
    s = s / 100;
    l = l / 100;

    // Calculate the intermediate values
    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h * 6) % 2 - 1));
    let m = l - c / 2;

    // Assign the RGB values based on the hue
    let r, g, b;
    if (h < 1 / 6) {
        r = c;
        g = x;
        b = 0;
    } else if (h < 2 / 6) {
        r = x;
        g = c;
        b = 0;
    } else if (h < 3 / 6) {
        r = 0;
        g = c;
        b = x;
    } else if (h < 4 / 6) {
        r = 0;
        g = x;
        b = c;
    } else if (h < 5 / 6) {
        r = x;
        g = 0;
        b = c;
    } else {
        r = c;
        g = 0;
        b = x;
    }

    // Add the offset and convert to hexadecimal
    r = Math.round((r + m) * 255).toString(16).padStart(2, "0");
    g = Math.round((g + m) * 255).toString(16).padStart(2, "0");
    b = Math.round((b + m) * 255).toString(16).padStart(2, "0");

    // Return the hexcode
    return `${r}${g}${b}`;
}