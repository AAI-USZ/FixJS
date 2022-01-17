function () {
        var raind = loadModuleContext(path.join('bin', 'raind'), mocks);

        expect(program.version).toHaveBeenCalled();
        expect(program.option.calls.length).toBe(3);
        expect(program.option.calls[0].args).toEqual([
            '-c, --conf <path>',
            'start the server with a custom configuration file',
            raind.getProjectRoot,
            path.join(process.cwd(), 'conf', 'server.conf.default')
        ]);
        expect(program.option.calls[1].args).toEqual([
            '-d, --debug',
            'start the server in debug mode'
        ]);
        expect(program.option.calls[2].args).toEqual([
            '-D, --dir <path>',
            'the server working directory',
            process.cwd()
        ]);
    }