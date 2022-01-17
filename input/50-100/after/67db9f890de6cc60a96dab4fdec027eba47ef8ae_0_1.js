function() {
        var pixel = view.getPixel(0, 0);
        if (mapnik.versions.mapnik_number < 200100) {
            assert.equal(pixel, 0);
        } else {
            assert.equal(pixel, -2147483648);
        }
    }