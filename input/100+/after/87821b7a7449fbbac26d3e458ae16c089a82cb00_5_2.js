function() {
                var someScriptUrl = 'someScriptUrl';
                scriptAccessor.currentScriptUrl.andReturn(someScriptUrl);
                describeUi.describeUi('someSuite', 'someUrl', function() {
                    describeUi.it('someSpec2');
                    describeUi.it('someSpec2');
                });
                jasmineApi.jasmine.getEnv().specFilter = function(spec) {
                    return spec.description === 'someSpec2';
                };
                jasmineApi.jasmine.getEnv().execute();
                var clientData = simulateClientLoad(popup.sessionStorage);
                expect(clientData.specs.length).toBe(1);
                expect(clientData.specIndex).toBe(0);
                var spec = clientData.specs[0];
                expect(spec.specPath).toEqual(['someSuite', 'someSpec2']);
                expect(spec.url).toBe('someUrl');
                expect(spec.loadScripts).toEqual(['someJasmineUiScriptUrl', someScriptUrl]);
            }