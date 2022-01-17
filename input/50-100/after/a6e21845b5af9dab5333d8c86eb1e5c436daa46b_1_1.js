function() {
        spyOn(console, 'error');

        var cb = jasmine.createSpy();

        mkdirp(path.join(tempDir, '.cordova'));

        cordova.create(tempDir);

        expect(console.error).toHaveBeenCalled();
    }