function onCheckContinue(req, res) {
                if (log.trace())
                        log.trace({event: 'checkContinue'}, 'event handled');

                if (self.listeners('checkContinue').length > 0)
                        return (self.emit('checkContinue', req, res));

                if (!options.noWriteContinue)
                        res.writeContinue();

                self._setupRequest(req, res);
                return (self._handle(req, res, true));
        }