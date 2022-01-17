function () {
        var layout = new Pattern(params);

        expect(layout.format(event)).toEqual('[%info%] 02/01/1970 01:01:01: Custom message');
    }