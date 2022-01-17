function (err) {
                        if (err) {
                            return cb2(err);
                        }
                        ev.emit('taskEnd', s.name, s.value);
                        cb2.apply(null, args);
                    }