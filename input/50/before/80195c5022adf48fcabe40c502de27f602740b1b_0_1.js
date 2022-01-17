function(text) {
    // break a string up into an array of tokens by anything non-word
    text = this.clearText(text);
    return this.trim(text.split(/[|$|\\b|\(|\)|[ \\s\\xA0\'\\.,:"]+/gi));
}