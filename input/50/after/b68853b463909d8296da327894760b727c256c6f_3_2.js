function () {
        websockets.configure(conf);

        var expectedPath = path.join('components', 'button2', 'server', 'websockets', 'socket.js');

        expect(socketRegistry.register).toHaveBeenCalledWith('/button/2.0/example',
                                                             expectedPath,
                                                             conf);
    }