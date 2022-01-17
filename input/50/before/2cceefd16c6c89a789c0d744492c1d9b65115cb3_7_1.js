function () {
            mockedWebworks.execSync = jasmine.createSpy();
            GLOBAL.window.webworks = mockedWebworks;
            client.exit();
            expect(mockedWebworks.execSync).toHaveBeenCalledWith("blackberry.app", "exit");
        }