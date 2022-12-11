import fs from 'fs';
/**
 * returns a 10-digit random number
 * --> send a number e.g. 20 to vary the length to 20 digits
 *
 * const idCode = qstr.getRandomIdNumber()
 *
 * 2837283728
 */
export const getRandomIdNumber = (length = 10) => {
    let r = '';
    for (let x = 1; x <= length; x++) {
        const randomDigit = Math.floor(Math.random() * 10);
        r += String(randomDigit);
    }
    return r;
};
export const writeFile = (pathAndFileName, content) => {
    fs.writeFileSync(pathAndFileName, content);
};
export const readFile = (pathAndFileName) => {
    return fs.readFileSync(pathAndFileName, { encoding: 'utf8' });
};
//# sourceMappingURL=tools.js.map