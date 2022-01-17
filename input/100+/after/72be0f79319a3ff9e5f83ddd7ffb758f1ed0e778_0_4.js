function() {
      var type, _i, _len, _ref3;
      this.results = {};
      this.sequence = [];
      _ref3 = this.getQuestionTypes();
      for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
        type = _ref3[_i];
        this.sequence = this.sequence.concat(this._shuffle(_(this.options.questions).filter(function(q) {
          return q.type === type;
        })).slice(0, this.options.numberOfQuestions));
        this.results[type] = {
          correct: 0,
          wrong: 0,
          times: new Stat
        };
      }
      this.sequence = this._shuffle(this.sequence);
      this.console.info('questions', _.map(this.sequence, function(q) {
        return q.question;
      }));
      this.timer = new StopWatch(this.console.error);
      return this._renderNext();
    }