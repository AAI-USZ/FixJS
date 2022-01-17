function() {
        spyOn(console, 'error');
        spyOn(console, 'log');

        var cwd = process.cwd();
        this.after(function() {
            process.chdir(cwd);
        });

        cordova.create(tempDir);

        process.chdir(tempDir);

        cordova.platform();

        expect(console.log).toHaveBeenCalled();
        expect(console.error).not.toHaveBeenCalled();
    }