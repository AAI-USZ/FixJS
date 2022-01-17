function() {
            spyOn(console, 'error');
            spyOn(console, 'log');

            process.chdir(tempDir);
            cordova.platform('ls');

            expect(console.error).not.toHaveBeenCalled();
            expect(console.log).toHaveBeenCalledWith('No platforms added. Use `cordova platforms add <platform>`.');
        }