function () {
            logger._log.andCallThrough();

            logger._log('debug', 'some message', error);

            expect(Event).toHaveBeenCalledWith('debug', 'some message', error);
            expect(appender1.append).toHaveBeenCalledWith(event);
            expect(appender2.append).toHaveBeenCalledWith(event);
        }