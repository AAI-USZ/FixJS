function () {
        var appender = new ConsoleAppender(0, layout, options);

        expect(Appender).toHaveBeenCalled();
    }