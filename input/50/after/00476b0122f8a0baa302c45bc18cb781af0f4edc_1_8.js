function(f, localeCode) {
        return round((date.create(f, localeCode).getTime() - this.getTime()) / multiplier);
      }