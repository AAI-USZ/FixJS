function(folder, done, verbose, matcher) {
    var fileMatcher = matcher || new RegExp(".(js)$", "i"),
        specs = require('./spec-collection'),
        jasmineEnv = jasmine.initialize(done, verbose);

    //Load the specs
    specs.load(folder, fileMatcher, true);

    //Add the specs to the context
    var specsList = specs.getSpecs();
    for ( var i = 0, len = specsList.length; i < len; ++i) {
        var filename = specsList[i];
        require(filename.path().replace(/\\/g, '/').replace(new RegExp('^' + env.dirname + '/'), "").replace(/\.\w+$/, ""));
    }

    //Run Jasmine
    jasmineEnv.execute();
}