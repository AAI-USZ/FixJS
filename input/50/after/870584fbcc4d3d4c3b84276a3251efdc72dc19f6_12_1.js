function () {
        var layout = new Pattern(params);

        expect(layout._placeholders.date(event)).toEqual('02/01/1970 01:01:01');
    }