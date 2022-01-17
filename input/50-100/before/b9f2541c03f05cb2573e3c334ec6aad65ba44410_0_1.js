function(err) {
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
            }