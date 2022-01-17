function(module, filename) {
            var code = fs.read(filename);
            var CoffeeScript = require('_coffee-script');
            try {
                code = CoffeeScript.compile(code);
            } catch (e) {
                e.fileName = filename;
                throw e;
            }
            module._compile(code);
        }