function () {
            geo.watchPosition(s, e);
            expect(window.setInterval).toHaveBeenCalledWith(jasmine.any(Function), Infinity);
        }