function out(str) {
    console.log(isatty ? str : str.stripColors);
}