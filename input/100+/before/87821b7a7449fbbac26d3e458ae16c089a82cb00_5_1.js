function() {
                describeUi.describeUi('someSuite', 'someUrl', function() {
                    describeUi.it('someSpec');
                });
                jasmineApi.jasmine.getEnv().execute();
                var clientData = simulateClientLoad(sessionStorage);
                expect(globals.window.location.href).toBe('someUrl?juir=1');
            }