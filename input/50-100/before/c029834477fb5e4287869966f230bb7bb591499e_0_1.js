function onCheckContinue(req, res) {
                if (log.trace())
                        log.trace({event: 'checkContinue'}, 'event handled');

                if (self.listeners('checkContinue').length > 0)
                        return (self.emit('checkContinue', req, res));

                self._setupRequest(req, res);
                res.writeContinue();
                return (self._handle(req, res, true));
        }