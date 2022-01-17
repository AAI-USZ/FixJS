function(f, localeCode) {
        return round((this.getTime() - date.create(f, localeCode).getTime()) / multiplier);
      }