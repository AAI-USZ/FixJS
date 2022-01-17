function (err2) {
                        if (err) {
                            return cb2(
                                'Error running task: ' + s.name + '\n' + err
                            );
                        }
                        if (err2) {
                            return cb2(err);
                        }
                        ev.emit('taskEnd', s.name, s.value);
                        cb2.apply(null, args);
                    }