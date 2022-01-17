function () {
        new ConsoleAppender(0, layout, options);

        expect(Appender).toHaveBeenCalled();
    }