function (exports, require) {

    var director = require('director');


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
    };

}