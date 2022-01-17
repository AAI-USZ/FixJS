function () {
                CommandManager.execute(Commands.FILE_OPEN, {fullPath: testPath + path})
                    .done(function () {
                        didOpen = true;
                    })
                    .fail(function () { gotError = true; });
            }