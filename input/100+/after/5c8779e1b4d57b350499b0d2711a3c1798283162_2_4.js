function() {
  var Capkom, Stat, StopWatch, _ref,
    _this = this;

  Capkom = (_ref = this.Capkom) != null ? _ref : this.Capkom = {};

  jQuery.widget("Capkom.wordmatch", {
    options: {
      profile: Capkom.profile,
      result: function(details) {
        return this.console.info('detailed results:', details);
      },
      symbolSize: 150,
      numberOfQuestions: 5,
      rootPrefix: 'img/',
      questions: [
        {
          type: 's2w',
          question: 'tree.jpg',
          choices: ['Baum', 'Haus', 'Hose'],
          correct: 'Baum'
        }, {
          type: 's2w',
          question: 'house.jpg',
          choices: ['Baum', 'Haus', 'Hose'],
          correct: 'Haus'
        }, {
          type: 's2w',
          question: 'pants.gif',
          choices: ['Baum', 'Haus', 'Hose'],
          correct: 'Hose'
        }, {
          type: 'w2s',
          question: 'Baum',
          choices: ['tree.jpg', 'pants.gif', 'house.jpg'],
          correct: 'tree.jpg'
        }, {
          type: 'w2s',
          question: 'Haus',
          choices: ['tree.jpg', 'pants.gif', 'house.jpg'],
          correct: 'house.jpg'
        }, {
          type: 'w2s',
          question: 'Hose',
          choices: ['tree.jpg', 'pants.gif', 'house.jpg'],
          correct: 'pants.gif'
        }
      ]
    },
    _create: function() {
      this._fixConsole();
      this._savedCSS = {
        position: this.element.css('position'),
        top: this.element.css('top'),
        bottom: this.element.css('bottom'),
        left: this.element.css('left'),
        right: this.element.css('right'),
        'z-index': this.element.css('z-index'),
        'background-color': this.element.css('background-color')
      };
      this.element.css({
        position: 'absolute',
        top: '5px',
        bottom: '5px',
        left: '5px',
        right: '5px',
        'background-color': '',
        'z-index': 100
      });
      this.element.addClass('wordmatch-container ui-widget-content');
      this.element.append("<div class='progressBar'></div>");
      this.progressBar = this.element.find(".progressBar");
      this.progressBar.css({
        'float': 'right',
        'width': '50%'
      });
      this.progressBar.progressbar();
      this.element.append("<div class='play-area'>\n  <table style=\"width: 100%;\">\n    <tr><td><div class='question-area'></div></td></tr>\n    <tr><td><div class='answer-area' style='text-align: center'></div></td></tr>\n  </table>\n</div>");
      this.playArea = this.element.find('.play-area');
      this.questionArea = this.element.find('.question-area');
      this.answerArea = this.element.find('.answer-area');
      this.questionArea.css({
        'text-align': 'center'
      });
      this.element.append("<div class='msg-dialog'></div>");
      this.messageArea = this.element.find('.msg-dialog');
      jQuery('body').bind('keyup', {
        widget: this
      }, this._escHandler);
      return this._beginGame();
    },
    _destroy: function() {
      this.element.html("");
      this.element.removeClass('wordmatch-container ui-widget-content');
      this.element.css(this._savedCSS);
      return jQuery('body').unbind('keyup', this._escHandler);
    },
    _beginGame: function() {
      this.sequence = this._shuffle(this.options.questions);
      this.sequence = this.sequence.slice(0, this.options.numberOfQuestions);
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
    },
    _renderNext: function() {
      var choice, _i, _j, _len, _len1, _ref1, _ref2,
        _this = this;
      this.updateProgress();
      if (this.sequence.length) {
        this.question = this.sequence.shift();
        switch (this.question.type) {
          case 's2w':
            this.questionArea.html("<img class='question' src='" + this.options.rootPrefix + this.question.question + "' style='height:" + this.options.symbolSize + "px;padding:1em;'/>");
            this.answerArea.html('');
            _ref1 = this._shuffle(this.question.choices);
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
              choice = _ref1[_i];
              this.answerArea.append("<button value='" + choice + "' width='" + this.options.symbolSize + " height='" + this.options.symbolSize + "' style='margin:1ex;'>" + choice + "</button>");
            }
            this.currentResultContainer = this.results.symbol2word;
            break;
          case 'w2s':
            this.questionArea.html("<h1 style='padding: 2ex;'>" + this.question.question + "</h1>");
            jQuery('h1', this.questionArea).css({
              "text-align": "center",
              "font-size": "140%"
            });
            this.answerArea.html('');
            _ref2 = this._shuffle(this.question.choices);
            for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
              choice = _ref2[_j];
              this.answerArea.append("<button value='" + choice + "' width='" + this.options.symbolSize + " height='" + this.options.symbolSize + "' style='margin: 1ex;'>\n  <img class='choice' src='" + this.options.rootPrefix + choice + "' style='height:" + this.options.symbolSize + "px;'/>\n</button>");
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
    },
    message: function(msg, cb) {
      var afterWaiting,
        _this = this;
      this.messageArea.html(msg).dialog({
        hide: "fade",
        close: function() {
          return _.defer(function() {
            _this.messageArea.dialog('destroy');
            return cb();
          });
        },
        dialogClass: 'shortmessage'
      });
      afterWaiting = function() {
        return _this.messageArea.dialog('close');
      };
      return setTimeout(afterWaiting, 1000);
    },
    finish: function() {
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
    },
    getInnerWidth: function() {
      return jQuery(window).width();
      if (jQuery.browser.msie) {
        return screen.availWidth;
      } else {
        return window.innerWidth;
      }
    },
    getInnerHeight: function() {
      return jQuery(window).height();
      if (jQuery.browser.msie) {
        return screen.availHeight;
      } else {
        return window.innerHeight;
      }
    },
    _fixConsole: function() {
      if (window.console) {
        return this.console = console;
      } else {
        return this.console = {
          info: function() {},
          error: function() {},
          log: function() {}
        };
      }
    },
    _shuffle: function(arr) {
      var randOrd;
      randOrd = function() {
        return Math.round(Math.random()) - 0.5;
      };
      return arr.slice(0).sort(randOrd);
    },
    updateProgress: function() {
      var val;
      val = (this.options.numberOfQuestions - this.sequence.length) / this.options.numberOfQuestions * 100;
      return this.progressBar.progressbar('value', val);
    },
    _escHandler: function(e) {
      if (e.keyCode === 27) {
        return e.data.widget.destroy();
      }
    }
  });

  Stat = (function() {

    Stat.name = 'Stat';

    function Stat(opts) {
      var options;
      options = {
        dropMargins: true
      };
      this.options = _.extend(options, opts);
      this._values = [];
    }

    Stat.prototype.getSamples = function() {
      var res;
      if (this.options.dropMargins) {
        res = _.sortBy(this._values, function(v) {
          return v;
        });
        return res.slice(1, -1);
      } else {
        return this._values;
      }
    };

    Stat.prototype.add = function(val) {
      return this._values.push(val);
    };

    Stat.prototype.length = function() {
      return this._values.length;
    };

    Stat.prototype.clear = function() {
      return this._values = [];
    };

    Stat.prototype.getAverage = function() {
      var smpls, sum;
      sum = 0;
      smpls = this.getSamples();
      _.each(smpls, function(val) {
        return sum += val;
      });
      return sum / smpls.length;
    };

    Stat.prototype.getVariance = function() {
      var av, smpls, v;
      av = this.getAverage();
      smpls = this.getSamples();
      v = 0;
      _.each(smpls, function(val) {
        return v += (av - val) * (av - val);
      });
      return v = v / smpls.length;
    };

    Stat.prototype.getStandardDeviation = function() {
      return Math.sqrt(this.getVariance());
    };

    Stat.prototype.getStatistics = function() {
      return {
        average: this.getAverage(),
        variance: this.getVariance(),
        standardDeviation: this.getStandardDeviation()
      };
    };

    return Stat;

  })();

  StopWatch = (function() {

    StopWatch.name = 'StopWatch';

    function StopWatch(error) {
      this.error = error != null ? error : function() {
        return this.console.error.apply(this.console, arguments);
      };
      this.elapsed = 0;
      this.status = 'idle';
    }

    StopWatch.prototype.start = function() {
      if (this.status === 'idle') {
        this.startTime = new Date().getTime();
        return this.status = 'running';
      } else {
        return this.error("Already running!");
      }
    };

    StopWatch.prototype.stop = function() {
      if (this.status === 'running') {
        this.elapsed += new Date().getTime() - this.startTime;
        return this.status = 'idle';
      } else {
        return this.error("Stop watch is not running, cannot stop!");
      }
    };

    StopWatch.prototype.clear = function() {
      this.elapsed = 0;
      return this.status = 'idle';
    };

    StopWatch.prototype.isRunning = function() {
      return this.status === 'running';
    };

    StopWatch.prototype.end = function() {
      var res;
      this.stop();
      res = this.elapsed;
      this.clear();
      return res;
    };

    StopWatch.prototype.clearAndStart = function() {
      this.clear();
      return this.start();
    };

    return StopWatch;

  })();

}