function (data, offset) {
    "use strict";
    offset = typeof(offset) !== 'undefined' ? offset : 0;
    var binTable = Base64.toBinaryTable,
        pad = Base64.base64Pad,
        result, result_length, idx, i, c, padding,
        leftbits = 0, // number of bits decoded, but yet to be appended
        leftdata = 0, // bits decoded, but yet to be appended
        data_length = data.indexOf('=') - offset;

    if (data_length < 0) { data_length = data.length - offset; }

    /* Every four characters is 3 resulting numbers */
    result_length = (data_length >> 2) * 3 + Math.floor((data_length%4)/1.5);
    result = new Array(result_length);

    // Convert one by one.
    for (idx = 0, i = offset; i < data.length; i++) {
        c = binTable[data.charCodeAt(i) & 0x7f];
        padding = (data.charAt(i) === pad);
        // Skip illegal characters and whitespace
        if (c === -1) {
            console.error("Illegal character code " + data.charCodeAt(i) + " at position " + i);
            continue;
        }
        
        // Collect data into leftdata, update bitcount
        leftdata = (leftdata << 6) | c;
        leftbits += 6;

        // If we have 8 or more bits, append 8 bits to the result
        if (leftbits >= 8) {
            leftbits -= 8;
            // Append if not padding.
            if (!padding) {
                result[idx++] = (leftdata >> leftbits) & 0xff;
            }
            leftdata &= (1 << leftbits) - 1;
        }
    }

    // If there are any bits left, the base64 string was corrupted
    if (leftbits) {
        throw {name: 'Base64-Error', 
               message: 'Corrupted base64 string'};
    }

    return result;
}