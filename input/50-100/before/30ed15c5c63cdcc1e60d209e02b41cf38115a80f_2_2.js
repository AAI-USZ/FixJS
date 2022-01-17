function() {
        spyOn(console, 'error');
        spyOn(console, 'log');

        var cwd = process.cwd();
        this.after(function() {
            process.chdir(cwd);
        });

        process.chdir(tempDir);

        cordova.platform();

        expect(console.log).not.toHaveBeenCalled();
        expect(console.error).toHaveBeenCalled();
    }