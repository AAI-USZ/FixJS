function() {
        var platform = process.platform;

        event.level.andReturn('fatal');
        process.platform = 'win32';
        var appender = new ConsoleAppender('fatal', layout, options);

        appender._write('Some message', event);
        expect(console.log).toHaveBeenCalledWith('Some message');

        process.platform = platform;
    }