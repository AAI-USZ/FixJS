function (header, module, limit, durations) {
    console.log(header);
    var msg = "%-15s (%02s runs): Average duration % 8dms for %d items";
    for (var testName in durations) {
        if (testName !== "total") {
            console.log(format(msg, testName, durations.total, durations[testName] / durations.total), limit);
        }
    }
    module.disconnect();
}