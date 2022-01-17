function(iso) {
      var offset = this.utc ? 0 : this.getTimezoneOffset();
      var colon  = iso === true ? ':' : '';
      if(!offset && iso) return 'Z';
      return padNumber(round(-offset / 60), 2, true) + colon + padNumber(offset % 60, 2);
    }