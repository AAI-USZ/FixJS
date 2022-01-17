function() {
        var cwd, mainFilename, mainModule = new Module();
        window.require = mainModule._getRequire();
        fs = loadFs();
        cwd = fs.absolute(phantom.libraryPath);
        mainFilename = joinPath(cwd, basename(require('system').args[0]) || 'repl');
        mainModule._setFilename(mainFilename);
    }