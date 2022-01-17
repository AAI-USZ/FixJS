function(templateName, context) {
        
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
    }