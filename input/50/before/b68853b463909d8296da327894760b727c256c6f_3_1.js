function () {
        websockets.configure(conf);

        var expectedFolder = path.join('components', 'button2', 'server',
                                       'websockets', 'socket.js');

        expect(global.requireWithContext.mostRecentCall.args[0]).toBe(expectedFolder);
    }