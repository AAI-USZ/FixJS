function () {
        websockets.configure(conf);

        expect(socketRegistry.register).toHaveBeenCalledWith('/button/2.0/example', socket.handle);
    }