function out(keyword, color, str) {
    str = keyword[color].bold + ' - '.grey + str;
    console.log(isatty ? str : str.stripColors);
}