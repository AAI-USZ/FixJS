function() {
    return {
      template: _.template("<div class=\"page\">\n  <h1><%= user.username %></h1>\n  <h3>Email: <%= user.email %></h3>\n</div>"),
      click: function(event) {
        return true;
      },
      loaded: function() {
        return fimo.events.on("click", this.click);
      },
      destroy: function() {
        return fimo.events.off("click", this.click);
      }
    };
  }