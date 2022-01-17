function () {
        it('should call _log with the correct level', function () {
            var levels = ['debug', 'info', 'warn', 'error', 'fatal'];
            for (var i = 0, len = levels.length; i < len; i++) {
                logger[levels[i]].andCallThrough();
                logger[levels[i]]('message', error);
                expect(logger._log).toHaveBeenCalledWith(levels[i], 'message', error);
            }
        });

        it ('should call append for all appenders', function () {
            logger._log.andCallThrough();

            logger._log('debug', 'some message', error);

            expect(Event).toHaveBeenCalledWith('debug', 'some message', error);
            expect(appender1.append).toHaveBeenCalledWith(event);
            expect(appender2.append).toHaveBeenCalledWith(event);
        });
    }