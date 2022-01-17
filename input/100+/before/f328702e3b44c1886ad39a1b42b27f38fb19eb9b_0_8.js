function() {
      var string;
      string = "sel" + this.generate_random_char() + this.generate_random_char() + this.generate_random_char();
      while ($("#" + string).length > 0) {
        string += this.generate_random_char();
      }
      return string;
    }