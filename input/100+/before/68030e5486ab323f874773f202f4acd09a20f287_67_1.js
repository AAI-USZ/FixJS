function (require, exports, module) {
    'use strict';
    
    /**
     * Loads a style sheet relative to the extension module.
     *
     * @param {!module} module Module provided by RequireJS
     * @param {!string} path Relative path from the extension folder to a CSS file
     * @return {!$.Promise} A promise object that is resolved if the CSS file can be loaded.
     */
    function loadStyleSheet(module, path) {
        var modulePath = module.uri.substr(0, module.uri.lastIndexOf("/") + 1),
            url = encodeURI(modulePath + path),
            result = new $.Deferred();

        // Make a request for the same file in order to record success or failure.
        // The link element's onload and onerror events are not consistently supported.
        $.get(url).done(function () {
            var $link = $("<link/>");
            
            $link.attr({
                type:       "text/css",
                rel:        "stylesheet",
                href:       url
            });
            
            $("head").append($link[0]);
            
            result.resolve($link[0]);
        }).fail(function (err) {
            result.reject(err);
        });
        
        return result;
    }
    
    exports.loadStyleSheet = loadStyleSheet;
}