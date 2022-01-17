function () {
        websockets.configure(conf);

        var expectedPath = path.join('components', 'button2', 'server', 'websockets', 'socket.js');

        expect(global.requireWithContext.mostRecentCall.args[0]).toBe(expectedPath);
    }