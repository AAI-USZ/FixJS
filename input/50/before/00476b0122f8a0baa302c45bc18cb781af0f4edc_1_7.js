function(f, localeCode) {
        return ((this.getTime() - date.create(f, localeCode).getTime()) / multiplier).round();
      }