function () {
            var newLogger = Logger.get();

            expect(newLogger instanceof Logger).toBe(true);
            expect(Logger._registerModules).toHaveBeenCalledWith('appenders', jasmine.any(Object));
            expect(Logger._registerModules).toHaveBeenCalledWith('layouts', jasmine.any(Object));
            expect(Logger._createAppender).toHaveBeenCalledWith(config.logger.appenders[0]);
            expect(Logger._createAppender).toHaveBeenCalledWith(config.logger.appenders[0]);
            expect(newLogger._appenders.length).toEqual(2);
        }