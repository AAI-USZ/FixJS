function () {
        it('should call _log with level debug', function () {
            logger.debug.andCallThrough();

            logger.debug('message', error);

            expect(logger._log).toHaveBeenCalledWith('debug', 'message', error);
        });
    }