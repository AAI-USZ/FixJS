function() {
        should.exist(require('webpage').create);
        should.exist(require('fs').separator);
        if (phantom.version.major >= 1 && phantom.version.minor >= 4) {
            should.exist(require('webserver').create);
        }
        if (phantom.version.major >= 1 && phantom.version.minor >= 5) {
            require('system').platform.should.equal('phantomjs');
        }
    }