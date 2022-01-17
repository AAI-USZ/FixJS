function () {
        it('should call _log with level info', function () {
            logger.info.andCallThrough();

            logger.info('message', error);

            expect(logger._log).toHaveBeenCalledWith('info', 'message', error);
        });
    }