function() {
      this.sequence = this._shuffle(this.options.questions);
      this.results = {
        word2symbol: {
          correct: 0,
          wrong: 0,
          times: new Stat
        },
        symbol2word: {
          correct: 0,
          wrong: 0,
          times: new Stat
        }
      };
      this.timer = new StopWatch();
      return this._renderNext();
    }