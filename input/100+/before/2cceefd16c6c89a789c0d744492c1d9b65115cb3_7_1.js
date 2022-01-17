function () {
    it("execSync should have been called once for each blackberry.app field", function () {
        expect(mockedWebworks.execSync.callCount).toEqual(fields.length + 1); // +1 to account for the call to execSync for events
    });

    describe("author", function () {
        it("should call execSync", function () {
            expect(mockedWebworks.execSync.argsForCall).toContain(execSyncArgs[fields.indexOf("author")]);
        });
    });

    describe("authorEmail", function () {
        it("should call execSync", function () {
            expect(mockedWebworks.execSync.argsForCall).toContain(execSyncArgs[fields.indexOf("authorEmail")]);
        });
    });

    describe("authorURL", function () {
        it("should call execSync", function () {
            expect(mockedWebworks.execSync.argsForCall).toContain(execSyncArgs[fields.indexOf("authorURL")]);
        });
    });

    describe("copyright", function () {
        it("should call execSync", function () {
            expect(mockedWebworks.execSync.argsForCall).toContain(execSyncArgs[fields.indexOf("copyright")]);
        });
    });

    describe("description", function () {
        it("should call execSync", function () {
            expect(mockedWebworks.execSync.argsForCall).toContain(execSyncArgs[fields.indexOf("description")]);
        });
    });

    describe("id", function () {
        it("should call execSync", function () {
            expect(mockedWebworks.execSync.argsForCall).toContain(execSyncArgs[fields.indexOf("id")]);
        });
    });

    describe("license", function () {
        it("should call execSync", function () {
            expect(mockedWebworks.execSync.argsForCall).toContain(execSyncArgs[fields.indexOf("license")]);
        });
    });

    describe("licenseURL", function () {
        it("should call execSync", function () {
            expect(mockedWebworks.execSync.argsForCall).toContain(execSyncArgs[fields.indexOf("licenseURL")]);
        });
    });

    describe("name", function () {
        it("should call execSync", function () {
            expect(mockedWebworks.execSync.argsForCall).toContain(execSyncArgs[fields.indexOf("name")]);
        });
    });

    describe("version", function () {
        it("should call execSync", function () {
            expect(mockedWebworks.execSync.argsForCall).toContain(execSyncArgs[fields.indexOf("version")]);
        });
    });
    
    describe("exit", function () {
        it("should call execSync", function () {
            mockedWebworks.execSync = jasmine.createSpy();
            GLOBAL.window.webworks = mockedWebworks;
            client.exit();
            expect(mockedWebworks.execSync).toHaveBeenCalledWith("blackberry.app", "exit");
        });
    });
}