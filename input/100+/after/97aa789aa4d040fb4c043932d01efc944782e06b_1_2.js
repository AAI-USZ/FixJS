function() {
            it("should provide a cached position if one exists and has a timestamp value conforming with passed in maximumAge", function() {
                // Create a date object from 2 seconds ago to store as cached position.
                var d = new Date();
                d.setTime(d.getTime() - 2000);
                var p = new Position(null, d);
                geo.lastPosition = p;

                geo.getCurrentPosition(s, e, {maximumAge:3000});

                expect(s).toHaveBeenCalledWith(p);
                expect(exec).not.toHaveBeenCalled();
            });

            it("should fire exec if a cached position exists but whose timestamp is longer than the maximumAge parameter", function() {
                // Create a date object from 2 seconds ago to store as cached position.
                var d = new Date();
                d.setTime(d.getTime() - 2000);
                var p = new Position(null, d);
                geo.lastPosition = p;

                geo.getCurrentPosition(s, e, {maximumAge:100});

                expect(exec).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function), "Geolocation", "getLocation", [false, Infinity, 100]);
            });

            it("should fire error callback with TIMEOUT code after timeout period has elapsed and no position is available", function() {
                runs(function() {
                    geo.getCurrentPosition(s, e, {timeout: 50});
                    expect(exec).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function), "Geolocation", "getLocation", [false, 50, 0]);
                });
                
                waits(75);

                runs(function() {
                    expect(e).toHaveBeenCalledWith({
                        code:PositionError.TIMEOUT,
                        message:"Position retrieval timed out."
                    });
                });
            });

            it("should not fire error callback with TIMEOUT if a position is obtained within the timeout period", function() {
                runs(function() {
                    geo.getCurrentPosition(s, e, {timeout:50});

                    // Call the success callback to "fake" the native framework returning a (empty) position object.
                    // This should also disable the timeout timer.
                    exec.mostRecentCall.args[0]({});
                });

                waits(75);

                runs(function() {
                    expect(e).not.toHaveBeenCalled();
                    expect(s).toHaveBeenCalled();
                });
            });

            it("should fire error callback with POSITION_UNAVAILABLE if error occurs during acquisition before timeout expires", function() {
                geo.getCurrentPosition(s, e, {timeout: 50});
                
                // Call the error callback to "fake" the native framework returning an error object.
                var eObj = {
                    code:PositionError.POSITION_UNAVAILABLE
                };
                exec.mostRecentCall.args[1](eObj);

                expect(e).toHaveBeenCalledWith({
                    code:PositionError.POSITION_UNAVAILABLE,
                    message:""
                });
            });

            it("should not fire error callback with TIMEOUT if error occurs during acquisition before timeout expires", function() {
                runs(function() {
                    geo.getCurrentPosition(s, e, {timeout: 50});

                    // Call the error callback to "fake" the native framework returning an error object.
                    var eObj = {
                        code:PositionError.POSITION_UNAVAILABLE
                    };
                    exec.mostRecentCall.args[1](eObj);
                });

                waits(75);

                runs(function() {
                    expect(e).not.toHaveBeenCalledWith({
                        code:PositionError.TIMEOUT,
                        message:"Position retrieval timed out."
                    });
                });
            });
        }