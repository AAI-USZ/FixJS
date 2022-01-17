function(testRun) {
        // Verify that all of the methods are exposed
        verifyAPIs(testRun, 'Emails', [
            'send'
        ]);
        finish(testRun);
    }