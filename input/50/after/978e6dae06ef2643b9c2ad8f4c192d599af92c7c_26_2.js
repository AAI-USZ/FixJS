function () {
            expect(mockedWebworks.execSync.argsForCall).toContain(execSyncArgs[fields.indexOf("uuid")]);
            expect(mockedWebworks.defineReadOnlyField).toHaveBeenCalledWith(client, "uuid", null);
        }