function splitString(cipher) {
    const len = cipher.length;
    const subLength = len % 5 == 0 ? len / 5 : Math.floor(len / 5) + 1;
    let startIndex = 0;
    const result = [];
    for (let i = 0; i < 5; i++) {
        result.push(cipher.substring(startIndex, startIndex + subLength));
        startIndex += subLength
    }
    return result;
}

function shiftCipher(message, shift) {
    if (shift < 0) {
        shift += 26;
    }
    else if (shift > 26) {
        shift %= 26;
    }
    let cipher = '';
    for (let i = 0; i < message.length; i++) {
        let x = message[i];
        if (x >= 'a' && x <= 'z') {
            let offset = x.charCodeAt(0) + shift - 'z'.charCodeAt(0);
            if (offset > 0) {
                cipher += String.fromCharCode('a'.charCodeAt(0) + offset - 1);
            } else {
                cipher += String.fromCharCode(x.charCodeAt(0) + shift);
            }
        } else if (x >= 'A' && x <= 'Z') {
            let offset = x.charCodeAt(0) + shift - 'Z'.charCodeAt(0);
            if (offset > 0) {
                cipher += String.fromCharCode('A'.charCodeAt(0) + offset - 1);
            } else {
                cipher += String.fromCharCode(x.charCodeAt(0) + shift);
            }
        } else {
            cipher += x;
        }
        shift= (shift+1)%26
    }

    return splitString(cipher);
}

const message = 'I should have known that you would have a perfect answer for me!!!'

const result = shiftCipher(message, -1);
console.log(message);
console.log(result);