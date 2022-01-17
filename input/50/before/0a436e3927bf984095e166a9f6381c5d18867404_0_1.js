function pad2(number) {
    // Pad numbers
    // snippet from
    // http://www.electrictoolbox.com/pad-number-two-digits-javascript/
    return (number < 10 ? '0' : '') + number;
}