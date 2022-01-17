function($) {
    "use strict";

    // this is a cached lookup table of templates
    var cache = {};

    var load = function(templateName) {
        // this function takes names like: "includes/_user.mustache"
        // and loads them from somewhere else.

        // they can be cached as functions, or as strings.
        // Strings are template content.
        if (typeof cache[templateName] === 'undefined') {
            // first we need to convert slashes to hyphens, since
            // they're DOM valid
            var domTemplateName = templateName.replace('/', '-');
            // compiled hogan templates are indexed without the extension
            var hoganTemplateName = domTemplateName.replace('.mustache','');
            if (document.getElementById(domTemplateName)) {
                // stupid hack to turn HTML-encoded templates into strings, see:
                // http://stackoverflow.com/a/2419664/61435
                cache[templateName] = $('<div />').html(
                    $(document.getElementById(domTemplateName)).html().trim()).text();
            }
            else if (templates[hoganTemplateName]){
                cache[templateName] = templates[hoganTemplateName];
            }
        }

        return cache[templateName];
    };

    var compile = function(templateName) {
        // returns a compiled template.
        // only works with Hogan.js or if templates pre-compiled.
        var templateContent = load(templateName),
            template = null;

        if (typeof templateContent === 'string' && window.Hogan) {
            template = cache[templateName] = window.Hogan.compile(templateContent);
        }
        if (template === null) {
            $.error("Couldn't compile template " + templateName);
        }
        return template;
    };

    var renderFunction = function(templateName) {
        // returns a wrapped `render` function
        // only works with Hogan.js or if templates pre-compiled.
        var template = compile(templateName);

        return function(context) {
            return template.render(context);
        };
    };

    var render = function(templateName, context) {
        
        // first we need to try and load the template
        var template = load(templateName);
        
        if (typeof template === 'undefined') {
            $.error('Unknown template ' + templateName);
        }
        // pre-compiled hogan templates are objects
        else if (typeof template === 'object') {
            // template has been pre-compiled, just render and return it
            return template.render(context);
        }

        // template hasn't been pre-compiled yet
        // so we need to do other things
        if (window.Hogan) {
            return window.Hogan.compile(template).render(context);
        }
        else if (window.Mustache) {
            return window.Mustache.render(template, context);
        }

        // we don't have Hogan or Mustache, so we need to bail
        $.error('Must have either Hogan.js or Mustache.js to load string templates');
    };

    $.fn.mustache = function(templateName, context) {
        // replaces the content of the passed in element with the content
        // rendered by Mustache

        return this.html(render(templateName, context));
    };

    $.mustache = function(templateName, context) {
        // returns the compiled HTML

        return render(templateName, context);
    };

    $.mustacheAsFunction = function(templateName) {
        // returns a function that can be used to render the
        // mustache template

        return renderFunction(templateName);
    };

}