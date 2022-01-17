function() {
        var cwd, mainFilename, mainModule = new Module();
        window.require = mainModule._getRequire();
        fs = loadFs();
        cwd = fs.absolute(phantom.libraryPath);
        mainFilename = joinPath(cwd, basename(require('system').args[0]) || 'repl');
        mainModule._setFilename(mainFilename);
        // include CoffeeScript which takes care of adding .coffee extension
        require('_coffee-script');
    }