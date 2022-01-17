function(name) {
      var url = "/views/" + name + ".handlebars";
      var template = $.ajax({url: url, async: false}).responseText;
      return Handlebars.compile(template);
    }