function(message, actual, expected) {
    var passed = true;
    if (arguments.length == 2) {
        passed = actual;
    } else {
        passed = actual == expected;
    }
    if (!passed) {
        throw new Error(message);
    }
}