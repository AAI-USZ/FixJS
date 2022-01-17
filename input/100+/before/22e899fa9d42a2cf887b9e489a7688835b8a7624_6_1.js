function(folder, matcher) {
    var helpers = [], helperCollection = require('./spec-collection');

    helperCollection.load(folder, matcher, true);
    helpers = helperCollection.getSpecs();
    for ( var i = 0, len = helpers.length; i < len; ++i) {
        var file = helpers[i].path();
        var helper = require(file.replace(/\\/g, '/').replace(new RegExp('^' + __dirname + '/'), "").replace(/\.*$/, ""));

        for (var key in helper) {
            this[key] = helper[key];
        }
    }
}