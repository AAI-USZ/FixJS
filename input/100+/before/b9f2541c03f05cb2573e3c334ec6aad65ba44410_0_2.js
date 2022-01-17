function runTestCase(tObj, tc, result) {
    var err = false;
    var status = 'OK';
    var async = !!tObj[tc].length;  // async if the function has at least 1 argument
    
    if (!async && tObj.beforeTest && typeof tObj.beforeTest == 'function') {
        try {
            tObj.beforeTest();
        } catch (e) {
            console.warn(e);
            result.status = TEST_STATUS_SKIPPED;
            return;
        }
    }
    
    var _done = function() {
        result.execTime = +new Date() - result.timeStart;
        logln(" %s (%d ms)", status, result.execTime);
        if (err) {
            console.warn(err);
        }
    };

    result.timeStart = +new Date();
    try {
        if (async) {
            logln("Testing '%s' (async start)...", tc.substr(4));
            tObj[tc](function(err) {
                var index = findRunningIndex(result.running, tc);
                if (index > -1) {  // if index == -1, then the test had timed out...
                    if (err) {
                        result.status = TEST_STATUS_FAILED;
                        result.error = err;
                        status = 'Failed';
                    } else {
                        result.status = TEST_STATUS_SUCCESS;
                    }
                    log("    ... '%s.%s' (async end)...", result.module, tc.substr(4));
                    _done();
                }
            });
        } else {        
            log("Testing '%s'...", tc.substr(4));
            tObj[tc]();
            result.status = TEST_STATUS_SUCCESS;
        }
    } catch (e) {
        err = formatTestCaseExceptionMessage(e);
        if (e.name && e.name == ERR_TYPE_SKIPPED) {
            result.status = TEST_STATUS_SKIPPED;
            status = 'Skipped';
        } else {
            result.status = TEST_STATUS_FAILED;
            result.error = e;
            status = 'Failed';
        }
    } finally {
        if (!async) {
            _done();
        }
    }
    
    if (!async && tObj.afterTest && typeof tObj.afterTest == 'function') {
        try {
            tObj.afterTest();
        } catch (e) {
            console.warn(e);
        }
    }
}