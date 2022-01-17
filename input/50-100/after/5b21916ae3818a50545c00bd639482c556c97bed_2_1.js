function() {
      _.defaults(this.attributes, defaults);
      if (!(this.attributes.scale != null)) {
        this.attributes.scale = {};
        return _.defaults(this.attributes.scale, defaultScale);
      }
    }