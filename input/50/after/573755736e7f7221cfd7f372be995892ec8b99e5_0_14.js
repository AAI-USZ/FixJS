function (e) {
            if (e.code == 'EADDRINUSE' && i < self.server.options.pasvPortRangeEnd)
                self.pasv.listen(++i);
        }