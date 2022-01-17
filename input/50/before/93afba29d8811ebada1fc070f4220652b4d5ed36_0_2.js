function(name) {
      var url = "/static/views/" + name + ".handlebars";
      var template = $.ajax({url: url, async: false}).responseText;
      return Handlebars.compile(template);
    }