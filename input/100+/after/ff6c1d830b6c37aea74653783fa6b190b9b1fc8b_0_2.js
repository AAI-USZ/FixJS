function() {
      if (this.required()) {
        return /^((\d{5}(-\d{4}))|(\d{5}))$/.test(this.value());
      } else {
        return true;
      }
    }