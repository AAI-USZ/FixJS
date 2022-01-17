function() {
    return {
      template: _.template("<div class=\"page\">\n  <h1><%= user.username ? user.username : 'No username given' %></h1>\n  <h3>Email: <%= user.email %></h3>\n  <br/>\n  <h2>Your profile picture</h2>\n  <% if ( user.picture ) { %>\n    <img src=\"<%= imageUrl %>\" />\n  <% } else { %>\n    no profile picture\n  <% } %>\n  <form action=\"<%=fimo.hostname%>/users/profilePicture\" method=\"POST\" enctype=\"multipart/form-data\">\n    <input type=\"file\" name=\"displayImage\">\n    <br/>\n    <input type=\"submit\">\n  </form>\n</div>\n"),
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