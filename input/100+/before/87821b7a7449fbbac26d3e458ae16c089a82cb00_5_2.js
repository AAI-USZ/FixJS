function() {
                describeUi.describeUi('someSuite', 'someUrl', function() {
                    describeUi.it('someSpec');
                });
                jasmineApi.jasmine.getEnv().execute();
                expect(reporter.reportRunnerResults).not.toHaveBeenCalled();
            }