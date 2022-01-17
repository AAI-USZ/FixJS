function (exports, require) {

    var director = require('director'),
        dblist = require('./dblist');


    exports.routes = {
        '/': require('./views/databases')
    };

    exports.init = function () {
        var router = new director.Router(exports.routes);
        router.init();

        if (!window.location.hash || window.location.hash === '#') {
            window.location = '#/';
            $(window).trigger('hashchange');
        }
        dblist.saveLocal();
    };

}