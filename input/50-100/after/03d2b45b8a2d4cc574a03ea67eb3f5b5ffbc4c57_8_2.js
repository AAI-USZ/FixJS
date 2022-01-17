function () {
            // callback allows specs to query the testWindow before they run
            callback.call(spec, _testWindow);
        }