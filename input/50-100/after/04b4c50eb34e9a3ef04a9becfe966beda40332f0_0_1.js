function (err, window) {
    global.window       = window;
    // global.navigator    = navigator;
    global.document     = window.document;
    global.jQuery       = window.jQuery;
    
    // enable QUnit module in node.js
    _.extend(global, {  
        QUnit : {
            module : QUnit.module 
        }
    });
    
    // make QUnit API global to make it like works in a browser             
    _.extend(global, QUnit);

    // require deps
    options.deps.forEach(_require, true);

    // require code
    _require(options.code, true);

    // require tests
    options.tests.forEach(function(res) {
        _require(res, false);
    });
}