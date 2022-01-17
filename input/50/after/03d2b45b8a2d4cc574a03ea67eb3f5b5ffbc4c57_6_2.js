function () {
                var promise = CommandManager.execute(Commands.FILE_OPEN, {fullPath: fullPath});
                waitsForDone(promise);
            }