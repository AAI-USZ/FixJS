function () {
        mocks = {};
        mocks['../appender'] = Appender = jasmine.createSpy('Appender');
        layout = jasmine.createSpyObj('layout', ['format']);
        event = jasmine.createSpyObj('event', ['level', 'message', 'error', 'logger']);
        event.logger.andReturn('RAIN');
        layout.format.andReturn('Some message');

        spyOn(console, 'log');

        options = {
            "debug": {
                "foreground": "green"
            },
            "info": {
                "foreground": "cyan"
            },
            "warn": {
                "foreground": "yellow"
            },
            "error": {
                "foreground": "red"
            },
            "fatal": {
                "foreground": "black",
                "background": "red"
            }
        };

        ConsoleAppender = loadModuleExports(path.join('lib', 'logging', 'appenders', 'console.js'),
                                            mocks);
    }