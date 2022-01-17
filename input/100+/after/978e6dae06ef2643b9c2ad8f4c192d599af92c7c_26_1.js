function () {
        beforeEach(function () {
            spyOn(console, "error");
            mockedWebworks.execSync = jasmine.createSpy().andThrow("Cannot read PPS object"); 
            GLOBAL.window.webworks = mockedWebworks;
            client = require(_apiDir + "/client");
        });

        afterEach(unloadClient);

        it("uuid should call execSync and catch error and return null", function () {
            expect(mockedWebworks.execSync.argsForCall).toContain(execSyncArgs[fields.indexOf("uuid")]);
            expect(mockedWebworks.defineReadOnlyField).toHaveBeenCalledWith(client, "uuid", null);
        });
    }