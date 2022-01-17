function() {
        var cwd, mainFilename, mainModule = new Module();
        window.require = mainModule._getRequire();
        fs = nativeRequire('fs');
        cwd = fs.absolute(phantom.libraryPath);
        mainFilename = joinPath(cwd, basename(nativeRequire('system').args[0]) || 'repl');
        mainModule._setFilename(mainFilename);
    }