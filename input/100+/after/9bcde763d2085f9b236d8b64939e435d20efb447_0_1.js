function (s, cb2) {

            ev.emit('taskStart', s.name, s.value);
            var tea = new exports.Tea(s.name, opt);

            try {
                tasks[s.name](tea, opt.context, s.value, function () {
                    var args = Array.prototype.slice.call(arguments);
                    tea.waitForWrites(function (err) {
                        if (err) {
                            return cb2(err);
                        }
                        ev.emit('taskEnd', s.name, s.value);
                        cb2.apply(null, args);
                    });
                });
            }
            catch (e) {
                // catch synchronous errors
                return cb2(e);
            }

        }