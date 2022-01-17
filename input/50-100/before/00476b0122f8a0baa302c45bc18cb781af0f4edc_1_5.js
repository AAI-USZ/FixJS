function(iso) {
      var offset = this.utc ? 0 : this.getTimezoneOffset();
      var colon  = iso === true ? ':' : '';
      if(!offset && iso) return 'Z';
      return (-offset / 60).round().pad(2, true) + colon + (offset % 60).pad(2);
    }