function () {
    var i, timeout = 0;
    
    process.argv.forEach(function (val, index, array) {
        if (val === "--debug") {
            timeout = 20000;
        }
    });
    
    setTimeout(START, timeout);
}