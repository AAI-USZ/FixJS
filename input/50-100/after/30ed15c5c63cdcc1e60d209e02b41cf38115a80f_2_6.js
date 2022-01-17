function() {
                cordova.platform('remove', 'android');
                expect(cordova.platform('ls')).toEqual('No platforms added. Use `cordova platform add <platform>`.');
            }