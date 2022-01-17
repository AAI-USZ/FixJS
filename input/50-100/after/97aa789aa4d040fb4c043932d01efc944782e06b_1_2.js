function() {
                    geo.getCurrentPosition(s, e, {timeout: 50});
                    expect(exec).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function), "Geolocation", "getLocation", [false, 50, 0]);
                }