function () {
                    var commandDeferred = q.defer(),
                        err;

                    //Call validate if it is on the command.
                    if (command.validate) {
                        err = command.validate.apply(command, args);
                        if (err) {
                            commandDeferred.reject(err);
                            return commandDeferred.promise;
                        }
                    }

                    try {
                        command.run.apply(command, [commandDeferred, venv].concat(args));
                    } catch (e) {
                        //Try to give more details on the error by giving the
                        //first two lines of the stack trace. If a volofile is
                        //in play, it should give a line number in the volofile.
                        commandDeferred.reject(e.stack.toString().split('\n').slice(0, 2).join('\n'));
                    }

                    return commandDeferred.promise;
                }