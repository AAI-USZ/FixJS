function(template, data, partials) {
      // use name for caching
      var name = template

      // check the cache
      if (!jQuery.template[name]) { jQuery.template(name, template); }

      data     = $.extend({}, this, data);
      partials = $.extend({}, data.partials, partials);
      for (partial in partials) {
        if (!jQuery.template[partial]) { jQuery.template(partial, partials[partial]); }
      }

      // we could also pass along jQuery-tmpl options as a last param?
      return jQuery.tmpl(name, jQuery.extend({}, this, data));
    }