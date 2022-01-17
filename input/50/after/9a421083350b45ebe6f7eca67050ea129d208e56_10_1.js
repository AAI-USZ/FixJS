function() {
        if (request.onsuccess) {
          request.onsuccess();
        }
        if (bool) {
          self.onenabled();
        } else {
          self.ondisabled();
        }
      }