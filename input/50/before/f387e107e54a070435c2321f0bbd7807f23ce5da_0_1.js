function() {
      if(this.id) {
        location.href = "/content/edit/" + this.id + "?returnTo=<%= request.url %>";
      }
    }