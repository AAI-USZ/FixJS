function () {
        mocks = {};

        program = jasmine.createSpyObj('program', ['option', 'version', 'usage', 'parse']);
        utils = jasmine.createSpyObj('utils', ['getProjectRoot']);
        server = jasmine.createSpyObj('server', ['initialize']);
        fs = jasmine.createSpyObj('fs', ['writeFileSync']);

        program.dir = process.cwd();
        program.debug = false;

        program.usage.andReturn(program);
        program.version.andReturn(program);
        program.option.andReturn(program);

        mocks['commander'] = program;
        mocks['./lib/utils'] = utils;
        mocks[path.join(cwd, 'lib', 'server')] = server;

        spyOn(process, 'chdir');
        spyOn(process, 'kill');
        spyOn(process, 'exit');
    }