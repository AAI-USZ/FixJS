function() {
            process.chdir(tempDir);

            expect(cordova.platform('ls')).toEqual('No platforms added. Use `cordova platform add <platform>`.');
        }