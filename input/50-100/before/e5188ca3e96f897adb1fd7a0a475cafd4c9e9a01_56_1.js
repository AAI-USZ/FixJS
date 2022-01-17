function(win)
        {
            var tests = [];
            tests.push(testCPUProfileClearButton);
            tests.push(testCPUProfileConsoleClearCommand);
            tests.push(testMemoryProfileClearButton);
            tests.push(testMemoryProfileConsoleClearCommand);

            FBTestFirebug.runTestSuite(tests, function()
            {
                FBTest.testDone("issue3980; DONE");
            });
        }