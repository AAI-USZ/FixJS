function() {
            spyOn(console, 'error');
            spyOn(console, 'log');

            process.chdir(tempDir);
            cordova.platform('add', 'android');
            cordova.platform('remove', 'android');

            cordova.platform('ls');

            expect(console.error).not.toHaveBeenCalled();
            expect(console.log).toHaveBeenCalledWith('No platforms added. Use `cordova platforms add <platform>`.');
        }