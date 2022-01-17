function processResult(res) {
            /*
            if (res.status) {
            console.log('**** Invalid widget - process result status: ' + res.status);
            } else {
            console.log(util.inspect(res.widgetConfig));
            }
            */

            // Cancel the install at this point, as we have the config
            if (res.getInstallId() !== undefined) {
                try { wm.abortInstall(res.getInstallId()); } catch (e) { }
            }

            if (runTests) {
                try {
//                    console.log("");
//                    console.log(res.getInstallId());
//                    console.log(that.path);

                    // Pass the widget config on to the test callback.
                    runTests(res.widgetConfig);

                    // Signal that the tests have finished.
                    finished();
                } catch (e) {
                    // An exception occurred during execution of the tests.
                    if (e.message) {
                        console.log("caught exception: " + e.message);
                        expect(e.message).toBeUndefined();
                    } else {
                        var caughtException = true;
                        expect(caughtException).toBeFalsy();
                    }
                    finished();
                }

            }
        }