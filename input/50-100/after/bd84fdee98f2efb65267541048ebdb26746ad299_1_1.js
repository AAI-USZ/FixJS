function() {
    resetGlobals();
    var test = 'bar/1.html';
    g_expectations = 'WONTFIX : bar = FAIL PASS TIMEOUT\n' +
        'WONTFIX MAC : ' + test + ' = FAIL\n' +
        'LINUX DEBUG : ' + test + ' = CRASH';
    
    runExpectationsTest('Webkit Win', test, 'FAIL PASS TIMEOUT', 'WONTFIX');
    runExpectationsTest('Webkit Win (dbg)(3)', test, 'FAIL PASS TIMEOUT', 'WONTFIX');
    runExpectationsTest('Webkit Linux', test, 'FAIL PASS TIMEOUT', 'WONTFIX');
    runExpectationsTest('Webkit Linux (dbg)(3)', test, 'CRASH', 'LINUX DEBUG');
    runExpectationsTest('Webkit Mac10.7', test, 'FAIL', 'WONTFIX MAC');
    runExpectationsTest('Webkit Mac10.7 (dbg)(3)', test, 'FAIL', 'WONTFIX MAC');
}