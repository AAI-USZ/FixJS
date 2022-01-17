function(code, word) {
    var ip = 0;
    while (ip < code.length)
        ip = forth.stepCode(ip, code, word);
}