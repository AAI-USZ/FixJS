function () {
                if (self.socketPath)
                        return ('http://' + self.socketPath);

                var addr = self.address();
                var str = self.secure ? 'https://' : 'http://';
                str += addr.address;
                str += ':';
                str += addr.port;
                return (str);
        }