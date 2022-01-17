function(template, data, name) {
      // use name for caching
      if (typeof name == 'undefined') { name = template; }

      // check the cache
      if (!jQuery.template[name]) { jQuery.template(name, template); }

      // we could also pass along jQuery-tmpl options as a last param?
      return jQuery.tmpl(name, jQuery.extend({}, this, data));
    }