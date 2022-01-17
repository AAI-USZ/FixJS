function(opts) {
            var port, body = window.document.body;
            options = $.extend({}, defaults, opts);
            
            // configure viewport
            port = options.viewPort;
            viewPort = port ? $("#" + port) : $(body);
            
            // show the start view
            pushView(options.startView);
         }