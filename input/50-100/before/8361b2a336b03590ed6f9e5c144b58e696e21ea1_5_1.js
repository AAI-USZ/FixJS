function(testRun) {
        // Verify that all of the methods are exposed
        verifyAPIs(testRun, 'Clients', [
            'geolocate'
        ]);
        finish(testRun);
    }