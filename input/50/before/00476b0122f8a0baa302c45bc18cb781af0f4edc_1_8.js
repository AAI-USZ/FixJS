function(f, localeCode) {
        return ((date.create(f, localeCode).getTime() - this.getTime()) / multiplier).round();
      }