function() {
      var val;
      val = (this.options.questions.length - this.sequence.length) / this.options.questions.length * 100;
      return this.progressBar.progressbar('value', val);
    }