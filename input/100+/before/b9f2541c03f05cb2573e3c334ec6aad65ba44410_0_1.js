function runTestSuite(module) {
    var result = {
        module: module.substr(TEST_DIR.length + 1, module.length - TEST_DIR.length - 5),
        tests: [],
        aborted: false
    };

    var tObj, testResult;
    try {
        logln("Initializing test suite for '%s'", result.module);
        tObj = require(module);

        if (typeof tObj.setup == 'function') tObj.setup();

        for (var prop in tObj) {
            if (/^test/.test(prop) && typeof tObj[prop] == 'function') {
                testResult = {
                    testCase: prop.substr(4),
                    status: TEST_STATUS_PENDING,
                    timeStart: 0,  // set just before doing actual test
                    execTime: 0
                };
                result.tests.push(testResult);
                runTestCase(tObj, prop, testResult);
            }
        }
        
        if (result.tests.length == 0) {
            logln("No test found!");
        }

    } catch (e) {
        console.warn(e);
        result.aborted = true;
    } finally {
        if (tObj && tObj.teardown && typeof tObj.teardown == 'function') {
            try {
                tObj.teardown();
            } catch (e) {
                console.warn(e);
            }
        }
    }
    
    return result;
}