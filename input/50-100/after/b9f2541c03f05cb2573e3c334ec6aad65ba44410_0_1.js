function(err) {
                if (result.status == TEST_STATUS_PENDING) {  // if index == -1, then the test had timed out...
                    if (err) {
                        result.status = TEST_STATUS_FAILED;
                        result.error = convertErrorToObject(err);
                        status = 'Failed';
                    } else {
                        result.status = TEST_STATUS_SUCCESS;
                    }
                    log("    ... '%s.%s' (async end)...", module, tc.substr(4));
                    _done();
                }
            }