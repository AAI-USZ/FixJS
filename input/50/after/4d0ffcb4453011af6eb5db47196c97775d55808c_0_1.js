function () {
        loadModuleExports(path.join('bin', 'raind'), mocks);
        expect(server.start).toHaveBeenCalled();
    }