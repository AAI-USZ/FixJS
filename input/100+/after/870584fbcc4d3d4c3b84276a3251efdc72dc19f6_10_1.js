function () {

        it('should throw an exception if options are missing', function () {
            function instantiate() {
                new FileAppender('info', layout);
            }

            expect(instantiate).toThrowType(RainError.ERROR_PRECONDITION_FAILED);
        });

        it('should throw an exception if file option is missing', function () {
            function instantiate() {
                new FileAppender('info', layout, {});
            }

            expect(instantiate).toThrowType(RainError.ERROR_PRECONDITION_FAILED);
        });

        it('should call the parent constructor', function () {
            options = {
                file: 'log.log'
            };
            appender = new FileAppender('info', layout, options);

            expect(Spy.Appender).toHaveBeenCalledWith('info', layout);
        });

        it('should create a write stream with default params', function () {
            options = {
                file: 'log.log'
            };
            appender = new FileAppender('info', layout, options);

            expect(Spy.fs.createWriteStream).toHaveBeenCalledWith(
                    options.file,
                    {
                        flags: 'a',
                        encoding: 'utf-8',
                        mode: '0644'
                    });

            expect(Spy.Stream.on.mostRecentCall.args[0]).toEqual('error');
            expect(Spy.Stream.on.mostRecentCall.args[1]).toEqual(jasmine.any(Function));
        });

        it('should create a write stream with custom params', function () {
            options = {
                file: 'log.log',
                encoding: 'ascii',
                mode: '0622'
            };
            appender = new FileAppender('info', layout, options);

            expect(Spy.fs.createWriteStream).toHaveBeenCalledWith(
                    options.file,
                    {
                        flags: 'a',
                        encoding: options.encoding,
                        mode: options.mode
                    });

            expect(Spy.Stream.on.mostRecentCall.args[0]).toEqual('error');
            expect(Spy.Stream.on.mostRecentCall.args[1]).toEqual(jasmine.any(Function));
        });
    }