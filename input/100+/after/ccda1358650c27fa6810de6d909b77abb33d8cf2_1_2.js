function() {
    var $nav, back, customBack, jumbles, wall;
    $nav = $("#navbar");
    jumbles = _.template("<ul class=\"navbar-items\">\n  <li><a href=\"dashboard\" class=\"btn btn-navbar\"><i class=\"icon-align-justify\"></i></a></li>\n  <li><div id=\"navbar-title\"><%= title %></div></li>\n  <li class=\"navbar-right\"><a href=\"newJumble\" class=\"btn btn-navbar\"><i class=\"icon-plus\"></i></a></li>\n</ul>");
    wall = _.template("<ul class=\"navbar-items\">\n  <li><a href=\"<%= back %>\" class=\"btn btn-navbar\">back</a></li>\n  <li><div id=\"navbar-title\" class=\"navbar-title-back\"><%= title %></div></li>\n  <li class=\"navbar-right\"><a href=\"add\" class=\"btn btn-navbar\"><i class=\"icon-plus\"></i></a></li>\n</ul>");
    back = _.template("<ul class=\"navbar-items\">\n  <li><a href=\"<%= back %>\" class=\"btn btn-navbar\" id=\"back\">back</a></li>\n  <li><div id=\"navbar-title\" class=\"navbar-title-back\"><%= title %></div></li>\n</ul>");
    customBack = _.template("<ul class=\"navbar-items\">\n  <li><a href=\"\" class=\"btn btn-navbar\" id=\"back\">back</a></li>\n  <li><div id=\"navbar-title\" class=\"navbar-title-back\"><%= title %></div></li>\n</ul>");
    return fimo.events.on("afterPageLoaded", function(viewName) {
      var title;
      title = $("#navbar-title").html();
      switch (viewName) {
        case "jumbles":
          return $nav.html(jumbles({
            title: title
          })).show();
        case "wall":
          return $nav.html(wall({
            title: title,
            back: "jumbles"
          })).show();
        case "image":
          return $nav.html(back({
            title: title,
            back: "wall"
          })).show();
        case "login":
        case "register":
          return $nav.html(back({
            title: title,
            back: "welcome"
          })).show();
        case "welcome":
          return $nav.hide();
        case "newJumble":
        case "jumbleObject":
        case "jumblePeople":
          return $nav.html(customBack({
            title: title
          })).show();
        default:
          return $nav.html(back({
            title: title,
            back: "back"
          })).show();
      }
    });
  }