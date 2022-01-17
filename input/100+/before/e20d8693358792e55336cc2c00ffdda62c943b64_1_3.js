function() {
      var choice, _i, _j, _len, _len1, _ref3, _ref4,
        _this = this;
      if (this.sequence.length) {
        this.question = this.sequence.shift();
        switch (this.question.type) {
          case 's2w':
            this.questionArea.html("<img class='question' src='" + this.options.rootPrefix + this.question.question + "' width='" + (this.options.symbolSize * 2) + " height='" + (this.options.symbolSize * 2) + "'/>");
            this.answerArea.html('');
            _ref3 = this._shuffle(this.question.choices);
            for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
              choice = _ref3[_i];
              this.answerArea.append("<button value='" + choice + "' width='" + this.options.symbolSize + " height='" + this.options.symbolSize + "'>" + choice + "</button>");
            }
            this.currentResultContainer = this.results.symbol2word;
            break;
          case 'w2s':
            this.questionArea.html("<h1>" + this.question.question + "</h1>");
            jQuery('h1', this.questionArea).css({
              "text-align": "center",
              "font-size": "140%"
            });
            this.answerArea.html('');
            _ref4 = this._shuffle(this.question.choices);
            for (_j = 0, _len1 = _ref4.length; _j < _len1; _j++) {
              choice = _ref4[_j];
              this.answerArea.append("<button value='" + choice + "' width='" + this.options.symbolSize + " height='" + this.options.symbolSize + "'>\n  <img class='choice' src='" + this.options.rootPrefix + choice + "' width='" + this.options.symbolSize + " height='" + this.options.symbolSize + "'/>\n</button>");
            }
            this.currentResultContainer = this.results.word2symbol;
        }
        this.buttonsDisabled = false;
        this.playArea.find('button').button().css({
          minWidth: this.options.symbolSize,
          minHeight: this.options.symbolSize
        }).click(function(e) {
          var attempt;
          if (!_this.buttonsDisabled) {
            _this.buttonsDisabled = true;
            attempt = jQuery(e.currentTarget).attr('value');
            if (attempt === _this.question.correct) {
              _this.currentResultContainer.times.add(_this.timer.end());
              _this.currentResultContainer.correct++;
              jQuery(e.currentTarget).css({
                'border': 'lightgreen 5px solid'
              });
              return _this.message('Korrekt!', function() {
                _this.buttonsDisabled = false;
                return _this._renderNext();
              });
            } else {
              _this.currentResultContainer.wrong++;
              jQuery(e.currentTarget).css({
                'border': 'red 5px solid'
              });
              return _this.message("Leider falsch.. Versuch's noch einmal!", function() {
                _this.buttonsDisabled = false;
                return jQuery(e.currentTarget).css({
                  'border': ''
                });
              });
            }
          }
        });
        return this.timer.start();
      } else {
        return this.finish();
      }
    }