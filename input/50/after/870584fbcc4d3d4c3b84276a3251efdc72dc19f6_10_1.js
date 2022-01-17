function () {
            options = {
                file: 'log.log'
            };
            appender = new FileAppender('info', layout, options);

            expect(Spy.Appender).toHaveBeenCalledWith('info', layout);
        }