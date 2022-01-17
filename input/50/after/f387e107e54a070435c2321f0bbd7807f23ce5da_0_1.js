function() {
      var id = this.id, l = location;
      if(id) {
        l.href = "/content/edit/" + id + "?returnTo=" + l.pathname + l.search + l.hash;
      }
    }