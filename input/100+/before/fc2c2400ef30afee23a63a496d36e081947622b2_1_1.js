function (callback) {
    if (sagecell.dependencies_loaded !== undefined) {
        return;
    }
    var load = function ( config ) {
        // We can't use the jquery .append to load javascript because then the script tag disappears.  At least mathjax depends on the script tag 
        // being around later to get the mathjax path.  See http://stackoverflow.com/questions/610995/jquery-cant-append-script-element.
        var script = document.createElement("script");
        if (config.type !== undefined) {
            script.type = config.type;
        }
        if (config.src !== undefined) {
            script.src = config.src;
        }
        if (config.text !== undefined) {
            script.text = config.text;
        }
        document.head.appendChild(script);
    };

    sagecell.init_callback = callback
    sagecell.dependencies_loaded = false;
    sagecell.last_session = {};

    // many stylesheets that have been smashed together into all.min.css
    var stylesheets = [sagecell.URLs.root + "static/all.min.css",
                       sagecell.URLs.root + "static/jqueryui/css/sage/jquery-ui-1.8.17.custom.css",
                       sagecell.URLs.root + "static/colorpicker/css/colorpicker.css"]
    for (var i = 0; i < stylesheets.length; i++) {
        document.head.appendChild(sagecell.util.createElement("link",
                {"rel": "stylesheet", "href": stylesheets[i]}));
    }

    // Mathjax.  We need a separate script tag for mathjax since it later comes back and looks at the script tag.
    load({'text': 'MathJax.Hub.Config({  \n\
          extensions: ["jsMath2jax.js", "tex2jax.js"],\n\
          tex2jax: {\n\
           inlineMath: [ ["$","$"], ["\\\\(","\\\\)"] ],\n\
           displayMath: [ ["$$","$$"], ["\\\\[","\\\\]"] ],\n\
           processEscapes: true,\n\
           processEnvironments: false}\n\
          });\n\
          // SVG backend does not work for IE version < 9, so switch if the default is SVG\n\
          //if (MathJax.Hub.Browser.isMSIE && (document.documentMode||0) < 9) {\n\
          //  MathJax.Hub.Register.StartupHook("End Config",function () {\n\
          //    var settings = MathJax.Hub.config.menuSettings;\n\
          //    if (!settings.renderer) {settings.renderer = "HTML-CSS"}\n\
          //  });\n\
          //}', 
          'type': 'text/x-mathjax-config'});
    load({"src": sagecell.URLs.root + "static/mathjax/MathJax.js?config=TeX-AMS-MML_HTMLorMML"});
    // many prerequisites that have been smashed together into all.min.js
    sagecell.sendRequest("GET", sagecell.URLs.root + "sagecell.html", {},
        function (data) {
            $(function () {
                sagecell.body = data;
                load({"src": sagecell.URLs.root + "static/all.min.js"})
            });
        }, undefined, "text/html");
}