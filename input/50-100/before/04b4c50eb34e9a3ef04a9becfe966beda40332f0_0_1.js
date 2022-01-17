function (err, window) {
    
    _.extend(global, {
        window      : window,
        document    : window.document,
        jQuery      : window.jQuery,
        // enable module for QUnit
        QUnit       : {
            module : QUnit.module 
        },
    });
    
    // make qunit api global, like it is in the browser
    _.extend(global, QUnit);
        
// require deps
    options.deps.forEach(_require, true);

// require code
    options.code.forEach(_require, true)
    // _require(options.code, true);

// require tests
    options.tests.forEach(function(res) {
        _require(res, false);
    });
}