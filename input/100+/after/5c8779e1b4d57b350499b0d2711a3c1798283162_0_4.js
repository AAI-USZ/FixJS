function() {
      var _this = this;
      this.playArea.html('');
      this.element.css(this._savedCSS);
      this.results.word2symbol.score = this.results.word2symbol.correct / (this.results.word2symbol.correct + this.results.word2symbol.wrong);
      this.results.word2symbol.times = this.results.word2symbol.times.getStatistics();
      this.results.symbol2word.score = this.results.symbol2word.correct / (this.results.symbol2word.correct + this.results.symbol2word.wrong);
      this.results.symbol2word.times = this.results.symbol2word.times.getStatistics();
      this.message("Gratuliere, das war's schon!", function() {
        console.info('results', _this.results);
        return _this.options.result(_this.results);
      });
      return this.destroy();
    }