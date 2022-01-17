function() {
      var val;
      val = (this.options.numberOfQuestions - this.sequence.length) / this.options.numberOfQuestions * 100;
      return this.progressBar.progressbar('value', val);
    }