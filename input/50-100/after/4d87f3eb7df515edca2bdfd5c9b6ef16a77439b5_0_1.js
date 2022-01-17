function(dirname) {
        if (!path.existsSync(dirname)) {
            throw new Error('Directory ' + dirname + ' doesn\'t exist');
        }
        
        var fs = require('fs'),
            files = fs.readdirSync(dirname),
            self = this;

        files.forEach(function(filename) {
            self._loadFile(path.join(dirname, filename));
        });
    }