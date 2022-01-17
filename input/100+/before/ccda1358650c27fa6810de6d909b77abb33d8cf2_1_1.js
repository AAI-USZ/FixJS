function(viewName) {
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
        default:
          return $nav.html(back({
            title: title,
            back: "back"
          })).show();
      }
    }