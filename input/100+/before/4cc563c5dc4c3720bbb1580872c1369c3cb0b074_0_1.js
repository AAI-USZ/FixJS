function(prop, n, range) {

    prop = prop.charAt(0);

    var current = this[prop]();

    switch (prop) {
      case 'r':
      case 'g':
      case 'b':
        this.set(
          prop,
          range ?
            max(0, min(
              255,
              (n * range) + (current - range/2)
            )) :
            n * 255
        );
        break;
      default:
        // h,s,l,a
        this.set(prop, range ? min(
          1,
          (n * range) + current - range/2
        ) : n);
    }

    return this;
  }