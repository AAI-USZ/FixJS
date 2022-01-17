function () {
                geo.getCurrentPosition(s, e);
                expect(exec).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function), "Geolocation", "getLocation", [false, Infinity, 0]);
            }