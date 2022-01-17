    set fullUrl(value) {
      var idx = value.indexOf('/');
      if (idx !== -1) {
        this.domain = value.substr(0, idx);
        this.url = value.substr(idx);
      } else {
        this.domain = value;
        this.url = '/';
      }
    },
