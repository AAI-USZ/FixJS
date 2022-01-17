function (e) {
            if (e.code == 'EADDRINUSE' && i < self.options.pasvPortRangeEnd)
                self.pasv.listen(++i);
        }