function(text) {
    // break a string up into an array of tokens by anything non-word
    return this.trim(text.split(/[|$|\\b|\(|\)|[ \\s\\xA0\'\\.,:"]+/gi));
}