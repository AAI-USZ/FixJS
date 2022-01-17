function() {
  var Capkom, Stat, StopWatch, loadSymbolset, _base, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8,
    _this = this;

  jQuery.widget("capkom.ttswidget", {
    options: {
      mode: 'button',
      lang: "de",
      backendUri: "http://dev.iks-project.eu/mary",
      backendType: "MARY",
      spinnerUri: "spinner.gif",
      dialogTitle: "TTS widget",
      defaultText: "No text found",
      buttonLabel: "Speak",
      errorMsg: "Error loading audio.",
      finished: function(e) {},
      manualActivate: function(e) {},
      forcedClose: function(e) {}
    },
    _create: function() {
      var _this = this;
      switch (this.options.mode) {
        case 'button':
          this.button = jQuery("<button class='tts-button' alt='" + this.options.buttonLabel + "'><i class='icon-volume-up'/></button>");
          this.button.prependTo(this.element);
          this.button.button({
            text: true
          });
          return this.button.click(function(e) {
            e.preventDefault();
            _this._trigger('manualActivate');
            _this.talk();
            return false;
          });
        case 'auto':
          return this.talk();
      }
    },
    _destroy: function() {
      var _this = this;
      return _.defer(function() {
        var _ref;
        if ((_ref = _this.dialog) != null) {
          _ref.dialog('destroy').remove();
        }
        _this.dialog = null;
        return jQuery(_this.button).remove();
      });
    },
    talk: function() {
      var audioSnippet, _ref,
        _this = this;
      if ((_ref = this.dialog) != null) {
        _ref.dialog('destroy').remove();
      }
      this.dialog = null;
      audioSnippet = null;
      if (jQuery.browser.msie) {
        audioSnippet = "<OBJECT id='playera' height='40' width='230' classid='clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95'>\n  <embed src='" + (this._makeLink()) + "' name='playera' width='230' height='40' pluginspage='http://www.microsoft.com/windows/windowsmedia/' type='application/x-mplayer2' autoplay='true' showcontrols='1' fullScreen='false' DisplaySize='0' autostart='true' controls='All' controller='true'></embed>\n  <PARAM NAME='AutoStart' VALUE='True'/>\n  <PARAM NAME='Filename' VALUE='" + (this._makeLink()) + "'/>\n  <PARAM NAME='Mute' VALUE='False'/>\n  <PARAM NAME='SendPlayStateChangeEvents' VALUE='True'/>\n  <PARAM NAME='ShowControls' VALUE='True'/>\n  <PARAM NAME='ShowAudioControls' VALUE='True'/>\n  <PARAM NAME='Volume' VALUE='1'/>\n  <PARAM NAME='AutoSize' VALUE='True'/>\n</OBJECT>";
      } else {
        audioSnippet = "<audio id='ttswidget-audio' controls='controls' style='' src='" + (this._makeLink()) + "'\n  type='audio/mpeg'>Your browser does not support the audio tag.\n</audio>\n<img class='spinner' src='" + this.options.spinnerUri + "'/>";
      }
      this.dialog = jQuery("<div class='ttswidget-dialog' title='" + this.options.dialogTitle + "'>\n  " + (this._getText()) + "\n  <br/><br/>\n  <div class='inner-content'></div>\n  " + audioSnippet + "\n</div>");
      this.dialog.appendTo(jQuery("body"));
      this._trigger('beforeDialog');
      this.dialog.dialog({
        close: function(e, ui) {
          if (e.currentTarget) {
            _this._trigger('forcedClose');
          }
          return _.defer(function() {
            var _ref1;
            if ((_ref1 = _this.dialog) != null) {
              _ref1.dialog('destroy').remove();
            }
            _this.dialog = null;
            return _this._trigger('done');
          });
        },
        hide: "fade",
        width: "500"
      });
      if (jQuery.browser.msie) {
        return document.playera.attachEvent("EndOfStream", function(state) {
          return _this.dialog.dialog("close");
        });
      } else {
        this.audioElement = jQuery("#ttswidget-audio")[0];
        this.audioElement.onabort = function() {};
        this.audioElement.load();
        this.audioElement.play();
        jQuery(this.audioElement).bind('playing', function() {
          return jQuery(".spinner", _this.dialog).hide();
        });
        jQuery(this.audioElement).bind('ended', function() {
          return _this.dialog.dialog("close");
        });
        return jQuery(this.audioElement).bind('error', function(e) {
          var errorHtml;
          errorHtml = "<br/>\n<div style=\"color: red\">\n    <span class=\"ui-icon ui-icon-alert\" style=\"float:left; margin:0 7px 20px 0;\"></span>" + _this.options.errorMsg + "\n</div>";
          return _this.dialog.append(errorHtml);
        });
      }
    },
    cancel: function() {
      if (this.dialog) {
        this.dialog.dialog('destroy').html('');
        this.dialog = null;
      }
      return true;
    },
    _getText: function() {
      if (this.element.attr("tts")) {
        return this.element.attr("tts");
      }
      if (this.element.text()) {
        return this.element.not(this.button).text().replace("" + this.options.buttonLabel, "");
      }
      return this.options.defaultText;
    },
    _getLang: function() {
      if (this.element.attr("lang")) {
        return this.element.attr("lang");
      }
      if (this.options.lang) {
        return this.options.lang;
      }
    },
    _getGender: function() {
      if (this.element.attr("gender")) {
        return this.element.attr("gender");
      }
      if (this.options.gender) {
        return this.options.gender;
      }
    },
    getInnerContentElement: function(cb) {
      var innerContent;
      innerContent = jQuery('.inner-content', this.dialog);
      return cb(innerContent);
    },
    preset: function(lang, gender) {
      var presets, res;
      if (lang == null) {
        lang = "en";
      }
      if (gender == null) {
        gender = "male";
      }
      presets = {
        "de-male": ["LOCALE=de", "VOICE=bits3"],
        "de-female": ["LOCALE=de", "VOICE=bits1-hsmm"],
        "en-male": ["LOCALE=en_GB", "VOICE=dfki-spike"],
        "en-female": ["LOCALE=en_GB", "VOICE=dfki-prudence"]
      };
      res = presets["" + lang + "-" + gender];
      if (!res) {
        if (typeof console !== "undefined" && console !== null) {
          console.error("There's no TTS preset defined for " + lang + " and " + gender + ".");
        }
      }
      return res || presets["de-female"];
    },
    _makeLink: function() {
      var params, res, text, uri, _encodeURI;
      _encodeURI = function(str) {
        return encodeURI(str).replace(/'/g, "%27");
      };
      text = this._getText();
      uri = this.options.backendUri + "/process?";
      params = this.preset(this._getLang(), this._getGender()).concat(["INPUT_TYPE=TEXT&OUTPUT_TYPE=AUDIO&INPUT_TEXT=" + (_encodeURI(text)), "OUTPUT_TEXT=", "effect_Volume_selected=", "effect_Volume_parameters=" + encodeURI("amount:2.0;"), "effect_Volume_default=Default", "effect_Volume_help=Help", "effect_TractScaler_selected=", "effect_TractScaler_parameters" + encodeURI("amount:1.5;"), "effect_TractScaler_default=Default", "effect_TractScaler_help=Help", "effect_F0Scale_selected=", "effect_F0Scale_parameters=" + encodeURI("f0Scale:2.0;"), "effect_F0Scale_default=Default", "effect_F0Scale_help=Help", "effect_F0Add_selected=", "effect_F0Add_parameters=" + encodeURI("f0Add:50.0;"), "effect_F0Add_default=Default", "effect_F0Add_help=Help", "effect_Rate_selected=", "effect_Rate_parameters=" + encodeURI("durScale:1.5;"), "effect_Rate_default=Default", "effect_Rate_help=Help", "effect_Robot_selected=", "effect_Robot_parameters=" + encodeURI("amount:100.0;"), "effect_Robot_default=Default", "effect_Robot_help=Help", "effect_Whisper_selected=", "effect_Whisper_parameters=" + encodeURI("amount:100.0;"), "effect_Whisper_default=Default", "effect_Whisper_help=Help", "effect_Stadium_selected=", "effect_Stadium_parameters=" + encodeURI("amount:100.0"), "effect_Stadium_default=Default", "effect_Stadium_help=Help", "effect_Chorus_selected=", "effect_Chorus_parameters=" + encodeURI("delay1:466;amp1:0.54;delay2:600;amp2:-0.10;delay3:250;amp3:0.30"), "effect_Chorus_default=Default", "effect_Chorus_help=Help", "effect_FIRFilter_selected=", "effect_FIRFilter_parameters=" + encodeURI("type:3;fc1:500.0;fc2:2000.0"), "effect_FIRFilter_default=Default", "effect_FIRFilter_help=Help", "effect_JetPilot_selected=", "effect_JetPilot_parameters=", "effect_JetPilot_default=Default", "effect_JetPilot_help=Help", "HELP_TEXT=", "VOICE_SELECTIONS=bits3%20de%20male%20unitselection%20general", "AUDIO_OUT=WAVE_FILE", "AUDIO=WAVE_FILE"]);
      res = uri + params.join('&');
      return res;
    }
  });

  Capkom = (_ref = this.Capkom) != null ? _ref : this.Capkom = {};

  jQuery.widget("Capkom.explain", {
    options: {
      profile: Capkom.profile,
      read: "This will be heard",
      html: "This will be shown. <button>Testknopf</button>",
      useAudio: true,
      domInit: function(element, done) {
        jQuery(element).find('button').button();
        return done();
      },
      after: function() {
        return alert("this should happen after reading the text.");
      },
      ttsOptions: {},
      maxSize: 200,
      minSize: 100,
      clickCount: 5,
      result: function(bestSize, details) {
        var res, result, size;
        res = "<h2>Results</h2>";
        res += "Measured Sizes (these sizes depend from the screen size)";
        res += "<ul>";
        for (size in details) {
          result = details[size];
          res += "<li>\n  size: " + size + "px, score: " + (Math.round(result.score * 100)) + " %<br/>\n  Reaction time: average: " + result.reactionTimeAverage + ", standard deviation: " + result.reactionTimeStDev + "<br/>\n  Move time: average: " + result.moveTimeAverage + ", standard deviation: " + result.moveTimeStDev + "\n </li>";
        }
        res += "</ul>";
        res += "<p>Minimum size resulted in " + bestSize + "</p>";
        jQuery('#results').html(res);
        return this.console.info('ideal size:', size, 'detailed results:', details);
      }
    },
    _create: function() {
      var _this = this;
      this.element.html("<div tts=\"" + this.options.read + "\" class=\"explain\">" + this.options.html + "</div>");
      this.explainPanel = this.element.find('.explain');
      return this.options.domInit(this.explainPanel, function() {
        var options;
        options = _.extend(_this.options.ttsOptions, {
          mode: 'auto',
          beforeDialog: function() {
            return _this.explainPanel.ttswidget('getInnerContentElement', function(innerContent) {
              console.info(_this.explainPanel, innerContent);
              return innerContent.append(_this.explainPanel);
            });
          },
          done: function() {
            _this._trigger('after');
            return _.defer(function() {
              if (_this.explainPanel) {
                _this.explainPanel.remove();
                return _this.explainPanel = null;
              }
            });
          },
          forcedClose: function() {
            return _this._trigger('forcedClose');
          }
        });
        return _this.explainPanel.ttswidget(options);
      });
    },
    _destroy: function() {
      return this.element.append(this.explainPanel);
    }
  });

  Capkom = (_ref1 = this.Capkom) != null ? _ref1 : this.Capkom = {};

  jQuery.widget("Capkom.sizedetect", {
    options: {
      profile: Capkom.profile,
      symbolLabel: "Catch me!",
      maxSize: 200,
      minSize: 100,
      clickCount: 5,
      timeout: 400,
      rootPrefix: '',
      result: function(bestSize, details) {
        var res, result, size;
        res = "<h2>Results</h2>";
        res += "Measured Sizes (these sizes depend from the screen size)";
        res += "<ul>";
        for (size in details) {
          result = details[size];
          res += "<li>\n  size: " + size + "px, score: " + (Math.round(result.score * 100)) + " %<br/>\n  Reaction time: average: " + result.reactionTimeAverage + ", standard deviation: " + result.reactionTimeStDev + "<br/>\n  Move time: average: " + result.moveTimeAverage + ", standard deviation: " + result.moveTimeStDev + "\n </li>";
        }
        res += "</ul>";
        res += "<p>Minimum size resulted in " + bestSize + "</p>";
        jQuery('#results').html(res);
        return this.console.info('ideal size:', size, 'detailed results:', details);
      },
      noclick: function(e) {
        return alert("You cannot use the computer with your current devices. Consult with Platus.");
      }
    },
    _create: function() {
      var _this = this;
      this._fixConsole();
      this.element.addClass('sizedetect-container ui-widget-content');
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
        position: 'fixed',
        top: '5px',
        bottom: '5px',
        left: '5px',
        right: '5px',
        'z-index': 100
      });
      this.element.append("<div class='progressBar'></div>");
      this.progressBar = this.element.find(".progressBar");
      this.progressBar.css({
        'float': 'right',
        'width': '50%'
      });
      this.progressBar.progressbar();
      this.element.append("<button class='catchme'><img src='" + this.options.rootPrefix + "aron.png'/></button>");
      this.catchme = this.element.find('.catchme');
      this.console.info(this.catchme.button());
      this.catchme.find('.ui-button-text').css({
        'padding': 0
      });
      this.catchme.click(function(e) {
        e.stopPropagation();
        return _this._attempt(true);
      });
      this.catchme.css({
        cursor: "url(" + this.options.rootPrefix + "blank.cur), none"
      });
      this.element.css({
        cursor: "url(" + this.options.rootPrefix + "blank.cur), none"
      });
      this.element.append("<img class='custom-cursor' src='" + this.options.rootPrefix + "futter.png'/>");
      this.cursor = jQuery('.custom-cursor', this.element);
      this.cursor.css({
        position: 'absolute',
        top: 0,
        left: 0,
        'z-index': 10000,
        'pointer-events': 'none'
      });
      this.cursor.click(function(e) {
        _this.cursor.hide();
        jQuery(document.elementFromPoint(e.clientX, e.clientY)).trigger('click');
        _.defer(function() {
          return _this.cursor.show();
        });
        return false;
      });
      this.element.mouseout(function(e) {
        if (!_this.catchme.has(e.relatedTarget)) {
          _this.cursor.hide();
        }
        return false;
      });
      this.element.mouseenter(function(e) {
        _this.cursor.show();
        return false;
      });
      this.element.mousemove(function(e) {
        return _this.cursor.css({
          left: e.clientX - (_this.cursorsize / 2),
          top: e.clientY - (_this.cursorsize / 2)
        });
      });
      this.element.click(function(e) {
        return _this._attempt(false);
      });
      jQuery('body').bind('keyup', {
        widget: this
      }, this._escHandler);
      this.element.mousemove(function(e) {
        if (_this.notyetmoved) {
          _this.notyetmoved = false;
          _this.reactionTime = _this.reactionTimer.end();
          return _this.moveTimer.start();
        }
      });
      this.element.append('<div id="moveTime"></div>');
      this.element.append('<div id="reactionTime"></div>');
      this.details = {};
      this.moveTimer = new StopWatch;
      this.reactionTimer = new StopWatch;
      this.moveTimeStat = new Stat;
      this.reactionTimeStat = new Stat;
      return this._beginGame();
    },
    _destroy: function() {
      this.element.html("");
      this.element.removeClass('sizedetect-container ui-widget-content');
      this.element.css(this._savedCSS);
      return jQuery('body').unbind('keyup', this._escHandler);
    },
    _beginGame: function() {
      var level;
      level = 2;
      while (Math.floor((Math.min(this.getInnerWidth(), this.getInnerHeight())) / level) > this.options.maxSize) {
        level++;
      }
      return this._newLevel(level - 1);
    },
    _newLevel: function(level) {
      if (this.size < this.options.minSize) {
        return this.finish();
      } else {
        this.level = level;
        this.size = Math.floor((Math.min(this.getInnerWidth(), this.getInnerHeight())) / this.level);
        this.cursorsize = this.size / 2;
        this.cursor.css({
          height: this.cursorsize,
          width: this.cursorsize
        });
        this.currentLevel = this.details[this.size.toString()] = [];
        this.progressBar.progressbar('value', 0);
        this.catchme.add('img', this.catchme).css({
          'width': this.size,
          'height': this.size
        });
        this.moveTimeStat.clear();
        this.reactionTimeStat.clear();
        this.console.info('new level started with symbol size', this.size);
        return this._newPosition();
      }
    },
    _newPosition: function() {
      var maxLeft, maxTop,
        _this = this;
      maxLeft = this.getInnerWidth() - this.size - 30;
      maxTop = this.getInnerHeight() - this.size - 30;
      this.catchme.css('left', Math.floor(Math.random() * maxLeft));
      this.catchme.css('top', Math.floor(Math.random() * maxTop));
      this.notyetmoved = true;
      this.reactionTimer.clearAndStart();
      return this.timeoutTimer = setTimeout(function() {
        return _this.timeout();
      }, this.options.timeout * 1000);
    },
    timeout: function() {
      return this.finish();
    },
    _attempt: function(succeeded) {
      var moveTime, progress;
      clearTimeout(this.timeoutTimer);
      if (succeeded) {
        moveTime = this.moveTimer.end();
        this.start = new Date().getTime();
        this.console.info('success', this.level, 'reactionTime:', this.reactionTime, 'moveTime:', moveTime);
        this.currentLevel.push({
          value: 1,
          moveTime: moveTime,
          reactionTime: this.reactionTime
        });
        this.reactionTimeStat.add(this.reactionTime);
        this.moveTimeStat.add(moveTime);
      } else {
        this.console.info('fail');
        this.currentLevel.push(0);
      }
      if (this.currentLevel.length >= this.options.clickCount) {
        this.evaluateCurrentLevel();
        if (this.currentLevel.score >= 0) {
          this.goodSize = this.size;
          this.console.info("goodSize is", this.goodSize, this);
          if (this.currentLevel.moveTimeAverage < 2000) {
            return this._newLevel(this.level + 2);
          } else {
            return this._newLevel(this.level + 1);
          }
        } else {
          return this.finish();
        }
      } else {
        progress = (this.currentLevel.length / this.options.clickCount) * 100;
        this.console.info('progress:', progress);
        this.progressBar.progressbar('value', Math.floor(progress));
        if (succeeded) {
          this.reactionTimer.clear();
          this.moveTimer.clear();
          return this._newPosition();
        }
      }
    },
    finish: function() {
      if (this.goodSize) {
        this.console.info('goodSize', this.goodSize, this);
        this.options.result.apply(this, [this.goodSize, this.details]);
      } else {
        this._trigger('noclick');
      }
      return this.destroy();
    },
    evaluateCurrentLevel: function() {
      var correct;
      correct = _.filter(this.currentLevel, function(r) {
        return r.value === 1;
      });
      this.currentLevel = this.details[this.size] = {
        score: correct.length / this.currentLevel.length,
        reactionTimeAverage: Math.round(this.reactionTimeStat.getAverage()),
        moveTimeAverage: Math.round(this.moveTimeStat.getAverage()),
        reactionTimeStDev: this.reactionTimeStat.getStandardDeviation(),
        moveTimeStDev: this.moveTimeStat.getStandardDeviation()
      };
      return this.console.info('level finished', this.level, this.currentLevel);
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

  Capkom = (_ref2 = this.Capkom) != null ? _ref2 : this.Capkom = {};

  jQuery.widget("Capkom.wordmatch", {
    options: {
      profile: Capkom.profile,
      result: function(details) {
        return console.info('detailed results:', details);
      },
      symbolSize: 150,
      numberOfQuestions: 3,
      rootPrefix: 'img/',
      questions: [
        {
          question: 'hund.jpg',
          choices: ['futter.jpg', 'lolli.jpg', 'apfel.jpg'],
          correct: 'futter.jpg',
          type: 'su'
        }, {
          question: 'baby.jpg',
          choices: ['auto.jpg', 'ei.jpg', 'kinderwagen.jpg'],
          correct: 'kinderwagen.jpg',
          type: 'su'
        }, {
          question: 'apfel.jpg',
          choices: ['wasser.jpg', 'birne.jpg', 'kuchen.jpg'],
          correct: 'birne.jpg',
          type: 'su'
        }, {
          question: 'baum.jpg',
          choices: ['apfel.jpg', 'dog.jpg', 'auto.jpg'],
          correct: 'apfel.jpg',
          type: 'su'
        }, {
          question: 'flugzeug.jpg',
          choices: ['dog.jpg', 'ballon.jpg', 'cat.jpg'],
          correct: 'ballon.jpg',
          type: 'su'
        }
      ]
      /*
              type: 's2w' # symbol to word
              question: 'tree.jpg'
              choices: ['Baum', 'Haus', 'Hose']
              correct: 'Baum'
            ,
              type: 's2w',
              question: 'house.jpg'
              choices: ['Baum', 'Haus', 'Hose']
              correct: 'Haus'
            ,
              type: 's2w',
              question: 'pants.gif'
              choices: ['Baum', 'Haus', 'Hose']
              correct: 'Hose'
            ,
              type: 'w2s' # word to symbol
              question: 'Baum'
              choices: ['tree.jpg', 'pants.gif', 'house.jpg']
              correct: 'tree.jpg'
            ,
              type: 'w2s' # word to symbol
              question: 'Haus'
              choices: ['tree.jpg', 'pants.gif', 'house.jpg']
              correct: 'house.jpg'
            ,
              type: 'w2s' # word to symbol
              question: 'Hose'
              choices: ['tree.jpg', 'pants.gif', 'house.jpg']
              correct: 'pants.gif'
            ]
      */

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
      console.info('before', _.map(this.sequence, function(q) {
        return q.question;
      }));
      this.sequence = this._shuffle(this.sequence);
      console.info('after', _.map(this.sequence, function(q) {
        return q.question;
      }));
      this.timer = new StopWatch();
      return this._renderNext();
    },
    getQuestionTypes: function() {
      return _.uniq(_.map(this.options.questions, function(q) {
        return q.type;
      }));
    },
    _renderQuestion: function(question) {
      var res;
      if (question == null) {
        question = this.question;
      }
      res = '';
      if (question.question.match(/\.(jpg|png|gif)$/)) {
        res = "<img class='question' src='" + this.options.rootPrefix + question.question + "' style='height:" + this.options.symbolSize + "px;padding:1em;'/>";
      } else {
        res = "<h1 style='padding:2ex; text-align:center; font-size:140%;'>" + question.question + "</h1>";
      }
      return res;
    },
    _renderAnswers: function(question) {
      var choice, res, _i, _j, _len, _len1, _ref3, _ref4;
      if (question == null) {
        question = this.question;
      }
      res = '';
      if (question.choices[0].match(/\.(jpg|png|gif)$/)) {
        _ref3 = this._shuffle(this.question.choices);
        for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
          choice = _ref3[_i];
          res += "<button value='" + choice + "' width='" + this.options.symbolSize + " height='" + this.options.symbolSize + "' style='margin: 1ex;'>\n  <img class='choice' src='" + this.options.rootPrefix + choice + "' style='height:" + this.options.symbolSize + "px;'/>\n</button>";
        }
      } else {
        _ref4 = this._shuffle(question.choices);
        for (_j = 0, _len1 = _ref4.length; _j < _len1; _j++) {
          choice = _ref4[_j];
          res += "<button value='" + choice + "' width='" + this.options.symbolSize + " height='" + this.options.symbolSize + "' style='margin:1ex;'>" + choice + "</button>";
        }
      }
      return res;
    },
    _renderNext: function() {
      var _this = this;
      this.updateProgress();
      this.answerArea.html('');
      if (this.sequence.length) {
        this.question = this.sequence.shift();
        this.currentResultContainer = this.results[this.question.type];
        this.questionArea.html(this._renderQuestion());
        this.answerArea.html(this._renderAnswers());
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
      var type, _i, _len, _ref3,
        _this = this;
      this.playArea.html('');
      this.element.css(this._savedCSS);
      _ref3 = this.getQuestionTypes();
      for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
        type = _ref3[_i];
        this.results[type].score = this.results[type].correct / (this.results[type].correct + this.results[type].wrong);
        this.results[type].times = this.results[type].times.getStatistics();
      }
      this.message("Gratuliere, das war's schon!", function() {
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
    _shuffle: function(v) {
      return _.shuffle(v);
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

  Capkom = (_ref3 = this.Capkom) != null ? _ref3 : this.Capkom = {};

  jQuery.widget("Capkom.capkomSymbol", {
    options: {
      profile: Capkom.profile,
      symbolSets: Capkom.symbolSets,
      symbolId: "default",
      symbolSize: null,
      uriPrefix: ""
    },
    _create: function() {
      var _base, _profileChange,
        _this = this;
      if ((_base = this.options).symbolSets == null) {
        _base.symbolSets = Capkom.symbolSets;
      }
      this.symbolId = this.element.attr("symbolId" || this.options.symbolId);
      this.symbolsize = this.element.attr("symbolsize" || this.options.symbolsize);
      this.symbol = jQuery('<img class="capkom-symbol" style="padding-right:5px;vertical-align:middle;display:none;"/>&nbsp;');
      this.symbol.prependTo(this.element);
      this.symbol = jQuery('img.capkom-symbol', this.element);
      this.symbol.hide();
      this._profileChange(this.options.profile);
      _profileChange = function(profile) {
        return _this._profileChange.apply(_this, [profile]);
      };
      return this.options.profile.bind('change', _profileChange);
    },
    _destroy: function() {
      return this.symbol.remove();
    },
    _profileChange: function(profile) {
      var symbolUri;
      symbolUri = this._getSymbolUri(profile, this.options.symbolSets);
      this.symbol.attr('src', symbolUri);
      if (profile.get('useSymbols') || this.element.attr('donthidesymbol')) {
        return this.symbol.show();
      } else {
        return this.symbol.hide();
      }
    },
    _getSymbolUri: function(profile, sets) {
      var preferredSet, symbolSet, symbolSetRanking, symbolSize, symbolUri,
        _this = this;
      preferredSet = this.options.symbolSets[profile.get('symbolSet')];
      symbolSetRanking = _.union([preferredSet], sets.sets);
      symbolSet = _.detect(symbolSetRanking, function(symbolSet) {
        return symbolSet.hasSymbol(_this.symbolId);
      });
      if (!symbolSet) {
        console.error("No symbolset found for " + this.symbolId);
        return "";
      }
      symbolSize = this.symbolsize || profile.get('symbolsize') || 'medium';
      return symbolUri = this.options.uriPrefix + symbolSet.getSymbolUri(this.symbolId, symbolSize);
    }
  });

  jQuery.widget("capkom.fontsize", {
    options: {
      min: 1,
      max: 8,
      value: 1,
      styleClass: "fontsize-widget",
      change: function(val) {
        return Capkom.console.info("fontsize value:", val);
      }
    },
    _create: function() {
      var i, _i, _ref4, _ref5,
        _this = this;
      this.element.addClass(this.options.styleClass);
      for (i = _i = _ref4 = this.options.min, _ref5 = this.options.max; _ref4 <= _ref5 ? _i <= _ref5 : _i >= _ref5; i = _ref4 <= _ref5 ? ++_i : --_i) {
        this.element.append(jQuery("<input type='radio' name='fontsize' id='fontsize-s" + i + "' />\n<label for='fontsize-s" + i + "' ><span class='fontsize-s" + i + " choose-button'>AAA</span></label>"));
      }
      Capkom.console.log(this.element, "created.");
      this._setValue(this.options.value);
      return this.buttonset = jQuery(this.element).buttonset({
        styleclass: "fontsize-buttons"
      }).change(function(e) {
        return _this.options.change(_this.options.value = e.target.id.replace("fontsize-s", ""));
      });
    },
    _destroy: function() {
      return this.element.removeClass(this.options.styleClass);
    },
    _setOption: function(key, value) {
      switch (key) {
        case "value":
          return this._setValue(value);
      }
    },
    _setValue: function(val) {
      var _ref4;
      jQuery("#fontsize-s" + val).attr("checked", "checked");
      if ((_ref4 = this.buttonset) != null) {
        _ref4.buttonset('refresh');
      }
      return this.options.value = val;
    }
  });

  Capkom = (_ref4 = this.Capkom) != null ? _ref4 : this.Capkom = {};

  if (Capkom.symbolSets == null) {
    Capkom.symbolSets = {};
  }

  if ((_base = Capkom.symbolSets).sets == null) {
    _base.sets = [];
  }

  /*
  Generic symbol set class
  */


  Capkom.Symbolset = (function() {

    Symbolset.name = 'Symbolset';

    function Symbolset(options) {
      this.options = options;
      this.name = options.name;
      this.nameMap = options.nameMap;
      this.baseUri = options.baseUri;
      this.nameFormat = options.nameFormat;
      this.sizeMap = options.sizeMap;
      this.symbols = options.symbols;
      Capkom.symbolSets[options.name] = this;
      Capkom.symbolSets.sets.push(this);
    }

    Symbolset.prototype.getSymbolUri = function(symbolId, symbolSize) {
      var imageName;
      imageName = this.nameFormat.replace("{symbolId}", this._applyMapping(symbolId, this.nameMap)).replace("{size}", this._applyMapping(symbolSize, this.sizeMap));
      return this.baseUri + imageName;
    };

    Symbolset.prototype.hasSymbol = function(symbolId) {
      var symbolName;
      if (this.nameMap) {
        symbolName = this._applyMapping(symbolId, this.nameMap);
      }
      if (_.contains(this.symbols, symbolName)) {
        return true;
      }
    };

    Symbolset.prototype._applyMapping = function(str, mapping) {
      return mapping[str] || str;
    };

    return Symbolset;

  })();

  Capkom = (_ref5 = this.Capkom) != null ? _ref5 : this.Capkom = {};

  Capkom.waitForMe = function() {
    var i;
    if (this._wait == null) {
      this._wait = [];
    }
    i = this._wait.length;
    Capkom.console.info("Waiting for #" + i + "..");
    this._wait[i] = {
      ready: false
    };
    return function() {
      Capkom.console.info("#" + i + " is ready");
      Capkom._wait[i].ready = true;
      return Capkom._oneDone();
    };
  };

  Capkom.once = function(cb) {
    this._once[this._once.length] = {
      done: false,
      cb: cb
    };
    return this._oneDone();
  };

  if (Capkom._once == null) {
    Capkom._once = [];
  }

  Capkom._oneDone = function() {
    var once, stillWaiting, _i, _len, _ref6, _results;
    stillWaiting = _(this._wait).detect(function(w) {
      return !w.ready;
    });
    if (!stillWaiting) {
      _ref6 = Capkom._once;
      _results = [];
      for (_i = 0, _len = _ref6.length; _i < _len; _i++) {
        once = _ref6[_i];
        if (!once.done) {
          once.done = true;
          _results.push(once.cb());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  };

  jQuery(document).ready(function() {
    return _.defer(function() {
      return Capkom.once(function() {
        Capkom.loadProfile(function() {
          Capkom.initNav();
          Capkom.updateTTS();
          return jQuery('.capkom-label').capkomSymbol({
            profile: Capkom.profile
          });
        });
        return jQuery('#loadingDiv').ajaxStart(function() {
          return jQuery(this).show();
        }).ajaxStop(function() {
          return jQuery(this).hide();
        });
      });
    });
  });

  Capkom.getStagename = function() {
    return window.location.hash.replace(/^#/, "");
  };

  Capkom.updateTTS = function() {
    if (Capkom.uiLoaded) {
      return jQuery(".tts").ttswidget(Capkom.getTTSOptions());
    } else {
      return jQuery(":capkom-ttswidget").ttswidget('option', 'disabled', true);
    }
  };

  if (window.console) {
    Capkom.console = console;
  } else {
    Capkom.console = Capkom.console = {
      info: function() {},
      error: function() {},
      log: function() {}
    };
  }

  Capkom.clickNext = function() {
    var activeTab;
    activeTab = jQuery('.ui-tabs-panel').filter(function(e, el) {
      return jQuery(el).css('display') !== 'none';
    });
    return jQuery('.nextButton', activeTab).trigger('click');
  };

  Capkom.nonClickMode = function() {
    return !Capkom.profile.get('canClick');
  };

  Capkom.canClick = function() {
    console.info('canClick: true');
    return Capkom.profile.set({
      canClick: true
    });
  };

  jQuery('body').click(function() {
    return this.canClick();
  });

  Capkom.autoReadMode = function() {
    return Capkom.profile.get('useAudio');
  };

  Capkom.Timeout = (function() {

    Timeout.name = 'Timeout';

    function Timeout() {}

    Timeout.prototype.start = function(secs, cb) {
      var run,
        _this = this;
      this.clear();
      run = function() {
        _this.timer = null;
        return cb();
      };
      return this.timer = setTimeout(run, secs * 1000);
    };

    Timeout.prototype.clear = function() {
      if (this.timer) {
        console.info("Cancel timeout");
        return clearTimeout(this.timer);
      }
    };

    return Timeout;

  })();

  Capkom.timeout = new Capkom.Timeout;

  Capkom.audioOff = function() {
    Capkom.canClick();
    console.info('deactivate audio');
    return Capkom.profile.set({
      useAudio: false
    });
  };

  Capkom.audioOn = function() {
    Capkom.canClick();
    console.info('activate audio');
    return Capkom.profile.set({
      useAudio: true
    });
  };

  Capkom.getTTSOptions = function() {
    return {
      spinnerUri: "css/spinner.gif",
      dialogTitle: "Sprechblase",
      lang: "de",
      forcedClose: function() {
        Capkom.timeout.clear();
        return Capkom.audioOff();
      },
      manualActivate: function() {
        return Capkom.audioOn();
      },
      active: !Capkom.profile.get("useAudio")
    };
  };

  Capkom.symbolunderstandingQuestions = [
    {
      question: 'hund.jpg',
      choices: ['futter.jpg', 'lolli.jpg', 'apfel.jpg'],
      correct: 'futter.jpg',
      type: 'su'
    }, {
      question: 'baby.jpg',
      choices: ['auto.jpg', 'ei.jpg', 'kinderwagen.jpg'],
      correct: 'kinderwagen.jpg',
      type: 'su'
    }, {
      question: 'apfel.jpg',
      choices: ['wasser.jpg', 'birne.jpg', 'kuchen.jpg'],
      correct: 'birne.jpg',
      type: 'su'
    }, {
      question: 'baum.jpg',
      choices: ['apfel.jpg', 'dog.jpg', 'auto.jpg'],
      correct: 'apfel.jpg',
      type: 'su'
    }, {
      question: 'flugzeug.jpg',
      choices: ['dog.jpg', 'ballon.jpg', 'cat.jpg'],
      correct: 'ballon.jpg',
      type: 'su'
    }
  ];

  Capkom.wordmatchQuestions = [
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
      type: 's2w',
      question: 'apfel.jpg',
      choices: ['Apfel', 'Hund', 'Erdbeere'],
      correct: 'Apfel'
    }, {
      type: 's2w',
      question: 'auto.jpg',
      choices: ['Hund', 'Erdbeere', 'Auto'],
      correct: 'Auto'
    }, {
      type: 's2w',
      question: 'ei.jpg',
      choices: ['Auto', 'Ei', 'Haus'],
      correct: 'Ei'
    }, {
      type: 's2w',
      question: 'rose.jpg',
      choices: ['Rose', 'Haus', 'Ei'],
      correct: 'Rose'
    }, {
      type: 's2w',
      question: 'erdbeere.jpg',
      choices: ['Katze', 'Erdbeere', 'Auto'],
      correct: 'Erdbeere'
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
    }, {
      type: 'w2s',
      question: 'Apfel',
      choices: ['cat.jpg', 'haus.jpg', 'apfel.jpg'],
      correct: 'apfel.jpg'
    }, {
      type: 'w2s',
      question: 'Auto',
      choices: ['tree.jpg', 'pants.gif', 'auto.jpg'],
      correct: 'auto.jpg'
    }, {
      type: 'w2s',
      question: 'Ei',
      choices: ['ei.jpg', 'haus.jpg', 'katze.jpg'],
      correct: 'ei.jpg'
    }, {
      type: 'w2s',
      question: 'Katze',
      choices: ['hund.jpg', 'katze.jpg', 'pants.gif'],
      correct: 'katze.jpg'
    }, {
      type: 'w2s',
      question: 'Schmetterling',
      choices: ['hund.jpg', 'schmetterling.jpg', 'tree.jpg'],
      correct: 'schmetterling.jpg'
    }
  ];

  Capkom = (_ref6 = this.Capkom) != null ? _ref6 : this.Capkom = {};

  loadSymbolset = function(url) {
    var cb;
    cb = Capkom.waitForMe();
    return jQuery.ajax({
      url: url + "/symbolset.json",
      dataType: "text",
      success: function(res) {
        res = JSON.parse(res);
        new Capkom.Symbolset(res);
        return cb();
      },
      error: function(err) {
        Capkom.console.error(err);
        return cb();
      }
    });
  };

  loadSymbolset("symbols/free1");

  loadSymbolset("symbols/capkom");

  Capkom = (_ref7 = this.Capkom) != null ? _ref7 : this.Capkom = {};

  Capkom.order = ["welcome", "symbolsize", "read", "symbolunderstanding", "fontsize", "theme", "channels", "symbolset", "goodbye"];

  Capkom.stages = {
    "welcome": {
      title: "Willkommen",
      image: "http://www.greeting-cards-4u.com/tubes/CharlyBrown/snoopy.gif",
      speech: "Willkommen im Online-Atelier! Hier bekommst du Hilfe beim Hochladen neuer Bilder,\nbeim Erstellen deines Profils und bei der Kommunikation mit anderen Künstlern.\nLass uns ein kleines Spiel spielen!",
      html: "Willkommen im Online-Atelier! Hier bekommst du Hilfe beim Hochladen neuer Bilder,\nbeim Erstellen deines Profils und bei der Kommunikation mit anderen Künstlern.\nLass‘ uns ein kleines Spiel spielen!\n<div class=\"explain-area\"></div>",
      explain: function(element, done) {
        var explainArea, explainAudioKnopf, explainWeiter;
        explainArea = jQuery('.explain-area', element);
        explainWeiter = function(done) {
          var weiterArea;
          weiterArea = explainArea.append("<div class='weiter'></div>").find('.weiter');
          return weiterArea.explain({
            read: "Benutze diesen Knopf damit du zum nächsten Schritt kommst.",
            useAudio: Capkom.profile.get('useAudio'),
            html: "<button class=\"nextButton demoButton\" alt=\"Weiter\" >\nWeiter\n<i class = \"icon-arrow-right\" />\n</button>",
            script: function(element) {
              return jQuery(element).find('button').button();
            },
            after: function() {
              return _.defer(function() {
                weiterArea.remove();
                return done();
              });
            },
            ttsOptions: Capkom.getTTSOptions()
          });
        };
        explainAudioKnopf = function(done) {
          var audioknopfArea;
          audioknopfArea = explainArea.append("<div class='audioknopf'></div>").find('.audioknopf');
          return audioknopfArea.explain({
            read: "Drücke diesen Knopf, wenn du das Vorlesen aktivieren oder deaktivieren möchtest.",
            useAudio: Capkom.profile.get('useAudio'),
            html: "<button class='tts-button demoButton' alt='Vorlesen'><i class='icon-volume-up'/></button>",
            script: function(element) {
              return jQuery(element).find('button').button();
            },
            after: function() {
              return _.defer(function() {
                audioknopfArea.remove();
                return done();
              });
            },
            ttsOptions: Capkom.getTTSOptions()
          });
        };
        return Capkom.timeout.start(4, function() {
          return explainWeiter(function() {
            console.info("'weiter' explanation done");
            return Capkom.timeout.start(2, function() {
              return explainAudioKnopf(function() {
                console.info("'audio' explanation done");
                return done();
              });
            });
          });
        });
      },
      show: function(element) {
        if (Capkom.nonClickMode()) {
          return Capkom.timeout.start(2, function() {
            return Capkom.clickNext();
          });
        }
      }
    },
    /*
       Definition of the symbol size selection screen
    */

    "symbolsize": {
      title: "Symbolgröße",
      speech: "Wir beginnen mit einem Fangspiel: Füttere den Hund indem du mit der Futterdose auf den Hund klickst.\nVersuche möglichst oft den Hund füttern, damit er glücklich und gesund bleibt.",
      condition: function(profile) {
        return profile.get("useSymbols");
      },
      image: "http://i.fonts2u.com/sn/mp1_snoopy-dings_1.png",
      html: "Wir beginnen mit einem Fangspiel: Füttere den Hund indem du mit der Futterdose auf den Hund klickst.\nVersuche möglichst oft den Hund füttern, damit er glücklich und gesund bleibt.<br/>\n<button class='start'>Start</button>\n<div class='fangspiel-area'></div>",
      /*
          explain: (element, done) ->
            Capkom.timeout.start 4, ->
              if Capkom.nonClickMode
                ttswidget = jQuery('.tts', element)
                _done = (e) ->
                  done()
                  ttswidget.unbind 'ttswidgetdone', _done
                ttswidget.bind 'ttswidgetdone', _done
                ttswidget.ttswidget('talk')
          show: (element, done) ->
            if Capkom.nonClickMode()
              Capkom.timeout.start 2, ->
                jQuery('.fangspiel-area', element).sizedetect
                  rootPrefix: 'lib/sizedetect/'
                  result: (size, details) ->
                    Capkom.profile.set
                      symbolsizeMin: size
                      symbolsizedetectDetails: details
      */

      startGame: function(element, done) {
        return jQuery('.fangspiel-area', element).sizedetect({
          rootPrefix: 'lib/sizedetect/',
          result: function(size, details) {
            Capkom.profile.set({
              symbolsizeMin: size,
              symbolsizedetectDetails: details
            });
            Capkom.canClick();
            return Capkom.clickNext();
          }
        });
      },
      scriptOnce: function(element) {
        return jQuery('.start', element).button().click(function(e) {
          return jQuery('.fangspiel-area', element).sizedetect({
            rootPrefix: 'lib/sizedetect/',
            result: function(size, details) {
              Capkom.profile.set({
                symbolsizeMin: size,
                symbolsizedetectDetails: details
              });
              return Capkom.clickNext();
            }
          });
        });
      }
    },
    /*
       Definition of the symbol size selection screen
    */

    "symbolunderstanding": {
      title: "Symbol-Verständnis",
      speech: "Symbolverständnis Erklärung",
      condition: function(profile) {
        return profile.get("useSymbols");
      },
      image: "http://i.fonts2u.com/sn/mp1_snoopy-dings_1.png",
      html: "Symbolverständnis Erklärung.\n<button class='start'>Start</button>\n<div class='fangspiel-area'></div>",
      scriptOnce: function(element) {
        return jQuery('.start', element).button().click(function(e) {
          debugger;          jQuery('.play-area', element).wordmatch({
            rootPrefix: 'lib/wordmatch/img/',
            result: function(res) {
              Capkom.profile.set({
                wordmatch: res
              });
              Capkom.clickNext();
              return jQuery('.play-area', element).wordmatch('destroy');
            },
            questions: Capkom.symbolunderstandingQuestions
          });
          return jQuery('.start', element).hide();
        });
      },
      startGame: function(element, done) {
        jQuery('.play-area', element).wordmatch({
          rootPrefix: 'lib/wordmatch/img/',
          result: function(res) {
            Capkom.profile.set({
              wordmatch: res
            });
            done();
            Capkom.clickNext();
            jQuery(':Capkom-wordmatch.play-area', element).wordmatch('destroy');
            return jQuery('.start', element).show();
          },
          questions: Capkom.symbolunderstandingQuestions,
          numberOfQuestions: 5
        });
        return jQuery('.start', element).hide();
      },
      show: function(element) {},
      hide: function(element) {
        return jQuery(':Capkom-wordmatch.play-area', element).wordmatch('destroy');
      }
    },
    "read": {
      title: "Wort-Bild Spiel",
      image: "http://www.balloonmaniacs.com/images/snoopygraduateballoon.jpg",
      speech: "Nun zeigen wir dir immer ein Bild und du musst das richtige Wort dazu finden. Schau dir das Bild an und klicke\ndann von den drei Wörtern auf das jeweils richtige Wort. Manchmal zeigen wir dir aber auch ein Wort und drei Bilder.\nDu musst dann das richtige Bild, das zum Wort gehört, anklicken.",
      html: "Nun zeigen wir dir immer ein Bild und du musst das richtige Wort dazu finden. Schau‘ dir das Bild an und klicke\ndann von den drei Wörtern auf das jeweils richtige Wort. Manchmal zeigen wir dir aber auch ein Wort und drei\nBilder. Du musst dann das richtige Bild, das zum Wort gehört, anklicken. <br/>\n<button class='start'>Start</button>",
      scriptOnce: function(element) {
        return jQuery('.start', element).button().click(function(e) {
          jQuery('.play-area', element).wordmatch({
            rootPrefix: 'lib/wordmatch/img/',
            result: function(res) {
              Capkom.profile.set({
                wordmatch: res
              });
              Capkom.clickNext();
              return jQuery('.play-area', element).wordmatch('destroy');
            },
            questions: Capkom.wordmatchQuestions
          });
          return jQuery('.start', element).hide();
        });
      },
      startGame: function(element, done) {
        jQuery('.play-area', element).wordmatch({
          rootPrefix: 'lib/wordmatch/img/',
          result: function(res) {
            Capkom.profile.set({
              wordmatch: res
            });
            done();
            Capkom.clickNext();
            jQuery('.play-area', element).wordmatch('destroy');
            return jQuery('.start', element).show();
          },
          questions: Capkom.wordmatchQuestions
        });
        return jQuery('.start', element).hide();
      },
      show: function(element) {},
      hide: function(element) {
        return jQuery(':Capkom-wordmatch.play-area', element).wordmatch('destroy');
      }
    },
    "fontsize": {
      title: "Schriftgröße",
      image: "http://www.thepartyanimal-blog.org/wp-content/uploads/2010/09/Halloween-Snoopy5.jpg",
      speech: "Wähle die Schriftgröße aus, die für dich am besten lesbar ist und klicke auf den Weiter Knopf.",
      html: "Wähle die Schriftgröße aus, die für dich am besten lesbar ist und klicke auf den Weiter Knopf.<br/><br/>\n<div class='fontsize'></div>",
      scriptOnce: function(element) {
        return jQuery(".fontsize").fontsize({
          value: Number(Capkom.profile.get('fontsize').replace("s", "")),
          change: function(val) {
            return Capkom.profile.set({
              'fontsize': "s" + val
            });
          }
        });
      }
    },
    "theme": {
      title: "Design",
      image: "http://www.balloonmaniacs.com/images/snoopygraduateballoon.jpg",
      speech: "Bitte bestimme nun die besten Farben für die Anzeige. Wähle die Farbkombination aus, die für dich am angenehmsten ist\nund klicke auf den Weiter Knopf.",
      html: "Bitte bestimme nun die besten Farben für die Anzeige. Wähle die Farbkombination aus, die für dich am angenehmsten ist\nund klicke auf den Weiter Knopf..<br/><br/>\n<span id='themeselector'></span>",
      scriptOnce: function(element) {
        return jQuery("#themeselector", element).themeswitcher({
          width: "5em",
          buttonHeight: 30,
          onSelect: function() {
            return Capkom.profile.set({
              "theme": $.cookie("jquery-ui-theme")
            });
          }
        });
      }
    },
    "channels": {
      title: 'Sprache/Symbole <img src="lib/ttswidget/speaker22.png" width="22" alt="Sprache"/>',
      image: "http://www.ecartooes.com/img/snoopy/peanuts_snoopy_11.jpg",
      speech: "Wie sollen Informationen dargestellt werden? Mit oder ohne Symbolen? Mit oder ohne Sprachausgabe?",
      html: "Wie sollen Informationen dargestellt werden?<br/><br/>\n<input type='radio' name='e2r' id='e2r-both'/>\n<label for='e2r-both' class='capkom-label' symbolId='text-with-symbols' donthidesymbol='true'>Text + Symbole</label>\n<input type='radio' name='e2r' id='e2r-alone'/>\n<label for='e2r-alone' class='capkom-label' symbolId='text-only' donthidesymbol='true'>Text</label>\n<br/><br/>\n<span symbolId='tts' class='capkom-label'>Sprachausgabe</span>:<br/><br/>\n<input type='radio' name='useAudio' id='audio-on'/>\n<label for='audio-on'>\n    <img src='symbols/Gnome-Audio-Volume-Medium-64.png' width='64' alt='Sprachausgabe an'/>\n</label>\n<input type='radio' name='useAudio' id='audio-off'/>\n<label for='audio-off'>\n    <img src='symbols/Gnome-Audio-Volume-Muted-64.png' width='64' alt='Keine Sprachausgabe'/>\n</label>",
      scriptOnce: function(element) {
        if (Capkom.profile.get("useSymbols")) {
          jQuery("#e2r-both").attr("checked", "checked");
        } else {
          jQuery("#e2r-alone").attr("checked", "checked");
        }
        jQuery('#e2r-alone, #e2r-both').button().click(function() {
          var state;
          state = this.id.replace("e2r-", "");
          switch (state) {
            case "alone":
              return Capkom.profile.set({
                useE2r: true,
                useSymbols: false
              });
            case "both":
              return Capkom.profile.set({
                useE2r: true,
                useSymbols: true
              });
          }
        });
        if (Capkom.profile.get("useAudio")) {
          jQuery("#audio-on").attr("checked", "checked");
        } else {
          jQuery("#audio-off").attr("checked", "checked");
        }
        return jQuery('#audio-on, #audio-off').button().click(function() {
          var state;
          state = this.id.replace("audio-", "");
          switch (state) {
            case "on":
              return Capkom.profile.set({
                useAudio: true
              });
            case "off":
              return Capkom.profile.set({
                useAudio: false
              });
          }
        });
      }
    },
    "symbolset": {
      title: "<label symbol-id='symbolset'>Symbolsatz</label>",
      /*
             only show it if symbols are turned on
      */

      condition: function(profile) {
        return profile.get("useSymbols");
      },
      image: "http://www.gelsenkirchener-geschichten.de/userpix/1208/1208_snoopy006_3.gif",
      speech: "Welche Art der Symbole gefällt dir am besten?",
      html: "Welche Art der Symbole gefällt dir am besten?<br/>\nDu kannst dir später auch Deine eigenen Symbole schaffen, indem du eigene Bilder oder Fotos hochlädst.\n<div class='symbolset-symbols'></div>",
      scriptOnce: function(element) {
        var html, symbolSet, symbolSetName, symbolSets, _i, _len;
        symbolSets = _.filter(Capkom.symbolSets.sets, function(symbolSet) {
          return symbolSet.hasSymbol("mainSymbol");
        });
        Capkom.console.info(symbolSets);
        for (_i = 0, _len = symbolSets.length; _i < _len; _i++) {
          symbolSet = symbolSets[_i];
          html = "<input type='radio' class='symbolset-selector " + symbolSet.name + "' name='symbolset' value='" + symbolSet.name + "' id='symbolset-" + symbolSet.name + "'/>\n<label for='symbolset-" + symbolSet.name + "'>\n    <img src='" + (symbolSet.getSymbolUri("mainSymbol", "large")) + "'/>\n</label>";
          jQuery(html).appendTo('.symbolset-symbols', element);
        }
        symbolSetName = Capkom.profile.get('symbolSet');
        jQuery('.symbolset-selector', element).filter("." + symbolSetName).attr("checked", "checked").end().button().click(function() {
          Capkom.console.log('click');
          return Capkom.profile.set({
            symbolSet: jQuery(this).val()
          });
        });
        return jQuery(".symbolset-symbols .symbolset-mainSymbol", element).find("." + symbolSet).addClass('selected').end().button();
      }
    },
    "goodbye": {
      title: "Ende",
      image: "http://www.slowtrav.com/blog/teachick/snoopy_thankyou_big.gif",
      speech: "Dein Profil enthält nun Informationen, die ich jetzt trotzdem nicht vorlesen werde, weil sie nur für die Entwickler da sind.",
      html: "Vielen Dank für deine Zeit! <br/>\nDein Profil enthält nun folgende Informationen:<br/><br/>\n<div id=\"profile\"></div>",
      scriptOnce: function(el) {
        var profileText;
        profileText = function() {
          return JSON.stringify(Capkom.profile.toJSON()).replace(/,"/g, ',<br/>"').replace(/^{|}$/g, "").replace(/":/g, '": ');
        };
        Capkom.profile.bind("change", function(profile) {
          return jQuery("#goodbye #profile").html(profileText());
        });
        return jQuery("#profile", el).html(profileText());
      }
    }
  };

  /*
  Get an array of stage objects in the configured order.
  */


  Capkom.getStages = function() {
    var i, res, stage, stagename;
    res = (function() {
      var _ref8, _results;
      _ref8 = Capkom.order;
      _results = [];
      for (i in _ref8) {
        stagename = _ref8[i];
        stage = Capkom.stages[stagename];
        stage.name = stagename;
        _results.push(stage);
      }
      return _results;
    })();
    res[0]._first = true;
    res[res.length - 1]._last = true;
    /* 
    Filter out the dependent and not-to-show stages based on `stage.condition`
    */

    return res = _(res).filter(function(stage) {
      if ((typeof stage.condition === "function" ? stage.condition(Capkom.profile) : void 0) !== false) {
        return true;
      }
    });
  };

  Capkom.showStages = function(el) {
    var an, anchor, anchorName, anchorNames, anchors, i, stage, stageNames, stages, _i, _j, _k, _len, _len1, _ref8, _ref9, _results, _results1;
    if (Capkom.uiLoaded) {
      stages = this.getStages();
      stageNames = _.map(stages, function(stage) {
        return stage.name;
      });
      anchors = jQuery(".stages").find("ul.titles").children();
      /*
              Remove not necessary tabs
      */

      _ref9 = (function() {
        _results = [];
        for (var _j = 0, _ref8 = anchors.length - 1; 0 <= _ref8 ? _j <= _ref8 : _j >= _ref8; 0 <= _ref8 ? _j++ : _j--){ _results.push(_j); }
        return _results;
      }).apply(this).reverse();
      for (_i = 0, _len = _ref9.length; _i < _len; _i++) {
        i = _ref9[_i];
        anchor = anchors[i];
        anchorName = jQuery(anchor).find("a").attr("href").replace(/^#/, "");
        /* anchorName not in stageNames?
        */

        if (_.indexOf(stageNames, anchorName) === -1) {
          jQuery(".stages").find("[href=#" + anchorName + "]").parent().hide();
        }
      }
      /*
              Return the current anchorNames
      */

      anchorNames = function() {
        return _.map(anchors, function(anchor) {
          return jQuery(anchor).find("a").attr("href").replace(/^#/, "");
        });
      };
      /*
              Add new tabs
      */

      _results1 = [];
      for (i = _k = 0, _len1 = stages.length; _k < _len1; i = ++_k) {
        stage = stages[i];
        an = anchorNames();
        if (_.indexOf(an, stage.name) === -1) {
          el.append(Capkom.renderStage(stage, jQuery(".stages"), i));
          el.tabs("add", "#" + stage.name, stage.title, i);
        }
        _results1.push($(".stages").find("[href=#" + stage.name + "]").parent().show());
      }
      return _results1;
    }
  };

  Capkom = (_ref8 = this.Capkom) != null ? _ref8 : this.Capkom = {};

  Capkom.Profile = Backbone.Model.extend();

  Capkom.profile = new Capkom.Profile;

  Capkom.profile.bind("change:fontsize", function(profile, fontsize) {
    var i, _i;
    for (i = _i = 1; _i <= 8; i = ++_i) {
      jQuery("body").removeClass("fontsize-s" + i);
    }
    return jQuery("body").addClass("fontsize-" + fontsize);
  });

  Capkom.profile.bind("change:theme", function(profile, theme) {
    var td, themeDetails;
    td = {};
    themeDetails = Capkom.themeMap[theme];
    _(themeDetails).each(function(v, k) {
      if (typeof v !== "string" || v.indexOf('.png') === -1) {
        return td[k] = v;
      }
    });
    if (profile.get('themeDetails') !== td) {
      Capkom.profile.set('themeDetails', td);
    }
    $.cookie("jquery-ui-theme", theme);
    return $("#bgThemeActivator").themeswitcher();
  });

  Capkom.profile.bind("change:useAudio", function(profile, audio) {
    return typeof Capkom.updateTTS === "function" ? Capkom.updateTTS() : void 0;
  });

  Capkom.profile.bind("change:useSymbols", function(profile, useSymbols) {
    if (typeof Capkom.showStages === "function") {
      Capkom.showStages(jQuery(".stages"));
    }
    return typeof Capkom.updateSymbols === "function" ? Capkom.updateSymbols() : void 0;
  });

  Capkom.profile.bind("change", function(profile) {
    return profile.save();
  });

  Backbone.sync = function(method, model) {
    localStorage.profile = JSON.stringify(model.toJSON());
    return Capkom.console.info("profile saved:", localStorage.profile);
  };

  Capkom.loadProfile = function(callback) {
    var setProfile;
    setProfile = function(profile) {
      if (typeof profile === "string") {
        profile = JSON.parse(profile);
      }
      Capkom.defaultProfile = profile;
      Capkom.profile.set(profile);
      return typeof callback === "function" ? callback() : void 0;
    };
    if (localStorage.profile) {
      return setProfile(localStorage.profile);
    } else {
      return jQuery.get("./default-profile.json", function(profile) {
        return _.defer(function() {
          return setProfile(profile);
        });
      });
    }
  };

  Capkom.initNav = function() {
    var i, stage, _ref9, _renderStageTitle;
    _renderStageTitle = function(stage) {
      return "<li><a class='stage-title capkom-label' symbolId='" + stage.name + "' href='#" + stage.name + "'>" + stage.title + "</a></li>";
    };
    _ref9 = Capkom.getStages();
    for (i in _ref9) {
      stage = _ref9[i];
      jQuery(".stages .titles").append(jQuery(_renderStageTitle(stage)));
      this.renderStage(stage, jQuery(".stages"));
    }
    jQuery(".stages").tabs({
      show: function(event, ui) {
        var autoExplain, autoForward, autoGameStart, autoread, newStage, _base1;
        jQuery(":capkom-ttswidget").each(function() {
          return jQuery(this).ttswidget('cancel');
        });
        window.location.hash = ui.tab.hash;
        Capkom.console.info(ui.tab.hash);
        newStage = _.detect(Capkom.getStages(), function(stage) {
          return stage.name === ui.tab.hash.substring(1);
        });
        if (Capkom.activeStage) {
          if (typeof (_base1 = Capkom.activeStage).hide === "function") {
            _base1.hide(jQuery("#" + Capkom.activeStage.name));
          }
        }
        Capkom.activeStage = newStage;
        autoread = function(stage, panel, done) {
          var d;
          if (Capkom.autoReadMode()) {
            return Capkom.timeout.start(2, function() {
              var ttswidget, _done;
              ttswidget = jQuery('.tts', panel);
              _done = function(e) {
                var d;
                d = done.shift();
                if (typeof d === "function") {
                  d(stage, panel, done);
                }
                return ttswidget.unbind('ttswidgetdone', _done);
              };
              ttswidget.bind('ttswidgetdone', _done);
              return ttswidget.ttswidget('talk');
            });
          } else {
            d = done.shift();
            return typeof d === "function" ? d(stage, panel, done) : void 0;
          }
        };
        autoExplain = function(stage, panel, done) {
          var d;
          if (stage.explain && Capkom.autoReadMode()) {
            return Capkom.timeout.start(2, function() {
              return stage.explain(panel, function() {
                var d;
                d = done.shift();
                return typeof d === "function" ? d(stage, panel, done) : void 0;
              });
            });
          } else {
            d = done.shift();
            return typeof d === "function" ? d(stage, panel, done) : void 0;
          }
        };
        autoGameStart = function(stage, panel, done) {
          var d;
          if (stage.startGame) {
            return Capkom.timeout.start(2, function() {
              return stage.startGame(panel, function() {
                var d;
                d = done.shift();
                return d(stage, panel, done);
              });
            });
          } else {
            d = done.shift();
            return typeof d === "function" ? d(stage, panel, done) : void 0;
          }
        };
        autoForward = function(stage, panel, done) {
          if (Capkom.nonClickMode()) {
            Capkom.timeout.start(2, function() {
              return Capkom.clickNext();
            });
          }
          return _.defer(function() {
            var d;
            d = done.shift();
            return typeof d === "function" ? d(stage, panel, done) : void 0;
          });
        };
        return autoread(newStage, ui.panel, [autoExplain, autoGameStart, autoForward]);
      }
    }).addClass('ui-tabs-vertical ui-helper-clearfix');
    return Capkom.uiLoaded = true;
  };

  Capkom.renderStage = function(stage, tabsEl, index) {
    var el, _renderStage,
      _this = this;
    _renderStage = function(stage) {
      var _ref9;
      return "<div id=\"" + stage.name + "\">\n    <table class=\"ui-widget-content\"><tr><td style=\"vertical-align: top;padding: 1em;\">\n        <div>\n            <img width=\"200\" class=\"stage-image " + ((_ref9 = stage.image) != null ? _ref9 : {
        '': 'hidden'
      }) + "\" alt=\"Wizard Bild\" src=\"" + stage.image + "\" />\n        </div>\n    </td><td>\n        <div style=\"padding: 5px 15px;\">\n            <span class=\"stage-content tts\" lang=\"de\">" + stage.html + "</span>\n        </div>\n    </td></tr><tr><td colspan=\"2\">\n        <div class=\"play-area\"></div>\n        <div class=\"buttons\">\n            <button class=\"prevButton\" alt=\"Zurück\">\n                <i class=\"icon-arrow-left\"></i>\n                Zurück\n            </button>\n            <button class=\"nextButton\" alt=\"Weiter\">\n                Weiter\n                <i class=\"icon-arrow-right\"/>\n            </button>\n        </div>\n    </td></tr></table>\n</div>";
    };
    el = null;
    if (tabsEl.find(".ui-tabs-panel").length && index) {
      el = jQuery(_renderStage(stage)).insertBefore(jQuery(tabsEl.find(".ui-tabs-panel")[index]));
    } else {
      el = jQuery(_renderStage(stage)).appendTo(tabsEl);
    }
    if (stage.scriptOnce) {
      stage.scriptOnce(jQuery(".stage-content", el));
    }
    if (stage._first) {
      jQuery(".prevButton", el).hide();
    }
    if (stage._last) {
      jQuery(".nextButton", el).hide();
    }
    jQuery(".prevButton", el).button().click(function() {
      var newIndex;
      Capkom.timeout.clear();
      newIndex = jQuery(".stages").find("ul.titles .ui-tabs-active").prev().index();
      return jQuery(".stages").tabs("select", newIndex);
    });
    jQuery(".nextButton", el).button().click(function() {
      var newIndex;
      Capkom.timeout.clear();
      newIndex = jQuery(".stages").find("ul.titles .ui-tabs-active").next().index();
      return jQuery(".stages").tabs("select", newIndex);
    });
    if (stage.speech) {
      jQuery(".stage-content.tts", el).attr("tts", stage.speech);
    }
    return el;
  };

  Capkom.themeMap = {
    "UI lightness": {
      "ffDefault": "Trebuchet MS, Tahoma, Verdana, Arial, sans-serif",
      "fwDefault": "bold",
      "fsDefault": "1.1em",
      "cornerRadius": "4px",
      "bgColorHeader": "f6a828",
      "bgTextureHeader": "12_gloss_wave.png",
      "bgImgOpacityHeader": "35",
      "borderColorHeader": "e78f08",
      "fcHeader": "ffffff",
      "iconColorHeader": "ffffff",
      "bgColorContent": "eeeeee",
      "bgTextureContent": "03_highlight_soft.png",
      "bgImgOpacityContent": "100",
      "borderColorContent": "dddddd",
      "fcContent": "333333",
      "iconColorContent": "222222",
      "bgColorDefault": "f6f6f6",
      "bgTextureDefault": "02_glass.png",
      "bgImgOpacityDefault": "100",
      "borderColorDefault": "cccccc",
      "fcDefault": "1c94c4",
      "iconColorDefault": "ef8c08",
      "bgColorHover": "fdf5ce",
      "bgTextureHover": "02_glass.png",
      "bgImgOpacityHover": "100",
      "borderColorHover": "fbcb09",
      "fcHover": "c77405",
      "iconColorHover": "ef8c08",
      "bgColorActive": "ffffff",
      "bgTextureActive": "02_glass.png",
      "bgImgOpacityActive": "65",
      "borderColorActive": "fbd850",
      "fcActive": "eb8f00",
      "iconColorActive": "ef8c08",
      "bgColorHighlight": "ffe45c",
      "bgTextureHighlight": "03_highlight_soft.png",
      "bgImgOpacityHighlight": "75",
      "borderColorHighlight": "fed22f",
      "fcHighlight": "363636",
      "iconColorHighlight": "228ef1",
      "bgColorError": "b81900",
      "bgTextureError": "08_diagonals_thick.png",
      "bgImgOpacityError": "18",
      "borderColorError": "cd0a0a",
      "fcError": "ffffff",
      "iconColorError": "ffd27a",
      "bgColorOverlay": "666666",
      "bgTextureOverlay": "08_diagonals_thick.png",
      "bgImgOpacityOverlay": "20",
      "opacityOverlay": "50",
      "bgColorShadow": "000000",
      "bgTextureShadow": "01_flat.png",
      "bgImgOpacityShadow": "10",
      "opacityShadow": "20",
      "thicknessShadow": "5px",
      "offsetTopShadow": "-5px",
      "offsetLeftShadow": "-5px",
      "cornerRadiusShadow": "5px"
    },
    "UI darkness": {
      "ffDefault": "Segoe UI, Arial, sans-serif",
      "fwDefault": "bold",
      "fsDefault": "1.1em",
      "cornerRadius": "6px",
      "bgColorHeader": "333333",
      "bgTextureHeader": "12_gloss_wave.png",
      "bgImgOpacityHeader": "25",
      "borderColorHeader": "333333",
      "fcHeader": "ffffff",
      "iconColorHeader": "ffffff",
      "bgColorContent": "000000",
      "bgTextureContent": "05_inset_soft.png",
      "bgImgOpacityContent": "25",
      "borderColorContent": "666666",
      "fcContent": "ffffff",
      "iconColorContent": "cccccc",
      "bgColorDefault": "555555",
      "bgTextureDefault": "02_glass.png",
      "bgImgOpacityDefault": "20",
      "borderColorDefault": "666666",
      "fcDefault": "eeeeee",
      "iconColorDefault": "cccccc",
      "bgColorHover": "0078a3",
      "bgTextureHover": "02_glass.png",
      "bgImgOpacityHover": "40",
      "borderColorHover": "59b4d4",
      "fcHover": "ffffff",
      "iconColorHover": "ffffff",
      "bgColorActive": "f58400",
      "bgTextureActive": "05_inset_soft.png",
      "bgImgOpacityActive": "30",
      "borderColorActive": "ffaf0f",
      "fcActive": "ffffff",
      "iconColorActive": "222222",
      "bgColorHighlight": "eeeeee",
      "bgTextureHighlight": "03_highlight_soft.png",
      "bgImgOpacityHighlight": "80",
      "borderColorHighlight": "cccccc",
      "fcHighlight": "2e7db2",
      "iconColorHighlight": "4b8e0b",
      "bgColorError": "ffc73d",
      "bgTextureError": "02_glass.png",
      "bgImgOpacityError": "40",
      "borderColorError": "ffb73d",
      "fcError": "111111",
      "iconColorError": "a83300",
      "bgColorOverlay": "5c5c5c",
      "bgTextureOverlay": "01_flat.png",
      "bgImgOpacityOverlay": "50",
      "opacityOverlay": "80",
      "bgColorShadow": "cccccc",
      "bgTextureShadow": "01_flat.png",
      "bgImgOpacityShadow": "30",
      "opacityShadow": "60",
      "thicknessShadow": "7px",
      "offsetTopShadow": "-7px",
      "offsetLeftShadow": "-7px",
      "cornerRadiusShadow": "8px"
    },
    "Smoothness": {
      "ffDefault": "Verdana,Arial,sans-serif",
      "fwDefault": "normal",
      "fsDefault": "1.1em",
      "cornerRadius": "4px",
      "bgColorHeader": "cccccc",
      "bgTextureHeader": "03_highlight_soft.png",
      "bgImgOpacityHeader": "75",
      "borderColorHeader": "aaaaaa",
      "fcHeader": "222222",
      "iconColorHeader": "222222",
      "bgColorContent": "ffffff",
      "bgTextureContent": "01_flat.png",
      "bgImgOpacityContent": "75",
      "borderColorContent": "aaaaaa",
      "fcContent": "222222",
      "iconColorContent": "222222",
      "bgColorDefault": "e6e6e6",
      "bgTextureDefault": "02_glass.png",
      "bgImgOpacityDefault": "75",
      "borderColorDefault": "d3d3d3",
      "fcDefault": "555555",
      "iconColorDefault": "888888",
      "bgColorHover": "dadada",
      "bgTextureHover": "02_glass.png",
      "bgImgOpacityHover": "75",
      "borderColorHover": "999999",
      "fcHover": "212121",
      "iconColorHover": "454545",
      "bgColorActive": "ffffff",
      "bgTextureActive": "02_glass.png",
      "bgImgOpacityActive": "65",
      "borderColorActive": "aaaaaa",
      "fcActive": "212121",
      "iconColorActive": "454545",
      "bgColorHighlight": "fbf9ee",
      "bgTextureHighlight": "02_glass.png",
      "bgImgOpacityHighlight": "55",
      "borderColorHighlight": "fcefa1",
      "fcHighlight": "363636",
      "iconColorHighlight": "2e83ff",
      "bgColorError": "fef1ec",
      "bgTextureError": "02_glass.png",
      "bgImgOpacityError": "95",
      "borderColorError": "cd0a0a",
      "fcError": "cd0a0a",
      "iconColorError": "cd0a0a",
      "bgColorOverlay": "aaaaaa",
      "bgTextureOverlay": "01_flat.png",
      "bgImgOpacityOverlay": "0",
      "opacityOverlay": "30",
      "bgColorShadow": "aaaaaa",
      "bgTextureShadow": "01_flat.png",
      "bgImgOpacityShadow": "0",
      "opacityShadow": "30",
      "thicknessShadow": "8px",
      "offsetTopShadow": "-8px",
      "offsetLeftShadow": "-8px",
      "cornerRadiusShadow": "8px"
    },
    "Redmond": {
      "ffDefault": "Lucida Grande, Lucida Sans, Arial, sans-serif",
      "fwDefault": "bold",
      "fsDefault": "1.1em",
      "cornerRadius": "5px",
      "bgColorHeader": "5c9ccc",
      "bgTextureHeader": "12_gloss_wave.png",
      "bgImgOpacityHeader": "55",
      "borderColorHeader": "4297d7",
      "fcHeader": "ffffff",
      "iconColorHeader": "d8e7f3",
      "bgColorContent": "fcfdfd",
      "bgTextureContent": "06_inset_hard.png",
      "bgImgOpacityContent": "100",
      "borderColorContent": "a6c9e2",
      "fcContent": "222222",
      "iconColorContent": "469bdd",
      "bgColorDefault": "dfeffc",
      "bgTextureDefault": "02_glass.png",
      "bgImgOpacityDefault": "85",
      "borderColorDefault": "c5dbec",
      "fcDefault": "2e6e9e",
      "iconColorDefault": "6da8d5",
      "bgColorHover": "d0e5f5",
      "bgTextureHover": "02_glass.png",
      "bgImgOpacityHover": "75",
      "borderColorHover": "79b7e7",
      "fcHover": "1d5987",
      "iconColorHover": "217bc0",
      "bgColorActive": "f5f8f9",
      "bgTextureActive": "06_inset_hard.png",
      "bgImgOpacityActive": "100",
      "borderColorActive": "79b7e7",
      "fcActive": "e17009",
      "iconColorActive": "f9bd01",
      "bgColorHighlight": "fbec88",
      "bgTextureHighlight": "01_flat.png",
      "bgImgOpacityHighlight": "55",
      "borderColorHighlight": "fad42e",
      "fcHighlight": "363636",
      "iconColorHighlight": "2e83ff",
      "bgColorError": "fef1ec",
      "bgTextureError": "02_glass.png",
      "bgImgOpacityError": "95",
      "borderColorError": "cd0a0a",
      "fcError": "cd0a0a",
      "iconColorError": "cd0a0a",
      "bgColorOverlay": "aaaaaa",
      "bgTextureOverlay": "01_flat.png",
      "bgImgOpacityOverlay": "0",
      "opacityOverlay": "30",
      "bgColorShadow": "aaaaaa",
      "bgTextureShadow": "01_flat.png",
      "bgImgOpacityShadow": "0",
      "opacityShadow": "30",
      "thicknessShadow": "8px",
      "offsetTopShadow": "-8px",
      "offsetLeftShadow": "-8px",
      "cornerRadiusShadow": "8px"
    },
    "Sunny": {
      "ffDefault": "Segoe UI, Arial, sans-serif",
      "fwDefault": "bold",
      "fsDefault": "1.1em",
      "cornerRadius": "8px",
      "bgColorHeader": "817865",
      "bgTextureHeader": "12_gloss_wave.png",
      "bgImgOpacityHeader": "45",
      "borderColorHeader": "494437",
      "fcHeader": "ffffff",
      "iconColorHeader": "fadc7a",
      "bgColorContent": "feeebd",
      "bgTextureContent": "03_highlight_soft.png",
      "bgImgOpacityContent": "100",
      "borderColorContent": "8e846b",
      "fcContent": "383838",
      "iconColorContent": "d19405",
      "bgColorDefault": "fece2f",
      "bgTextureDefault": "12_gloss_wave.png",
      "bgImgOpacityDefault": "60",
      "borderColorDefault": "d19405",
      "fcDefault": "4c3000",
      "iconColorDefault": "3d3d3d",
      "bgColorHover": "ffdd57",
      "bgTextureHover": "12_gloss_wave.png",
      "bgImgOpacityHover": "70",
      "borderColorHover": "a45b13",
      "fcHover": "381f00",
      "iconColorHover": "bd7b00",
      "bgColorActive": "ffffff",
      "bgTextureActive": "05_inset_soft.png",
      "bgImgOpacityActive": "30",
      "borderColorActive": "655e4e",
      "fcActive": "0074c7",
      "iconColorActive": "eb990f",
      "bgColorHighlight": "fff9e5",
      "bgTextureHighlight": "12_gloss_wave.png",
      "bgImgOpacityHighlight": "90",
      "borderColorHighlight": "eeb420",
      "fcHighlight": "1f1f1f",
      "iconColorHighlight": "ed9f26",
      "bgColorError": "d34d17",
      "bgTextureError": "07_diagonals_medium.png",
      "bgImgOpacityError": "20",
      "borderColorError": "ffb73d",
      "fcError": "ffffff",
      "iconColorError": "ffe180",
      "bgColorOverlay": "5c5c5c",
      "bgTextureOverlay": "01_flat.png",
      "bgImgOpacityOverlay": "50",
      "opacityOverlay": "80",
      "bgColorShadow": "cccccc",
      "bgTextureShadow": "01_flat.png",
      "bgImgOpacityShadow": "30",
      "opacityShadow": "60",
      "thicknessShadow": "7px",
      "offsetTopShadow": "-7px",
      "offsetLeftShadow": "-7px",
      "cornerRadiusShadow": "8px"
    },
    "Le Frog": {
      "ffDefault": "Lucida Grande, Lucida Sans, Arial, sans-serif",
      "fwDefault": "normal",
      "fsDefault": "1.1em",
      "cornerRadius": "10px",
      "bgColorHeader": "3a8104",
      "bgTextureHeader": "03_highlight_soft.png",
      "bgImgOpacityHeader": "33",
      "borderColorHeader": "3f7506",
      "fcHeader": "ffffff",
      "iconColorHeader": "ffffff",
      "bgColorContent": "285c00",
      "bgTextureContent": "05_inset_soft.png",
      "bgImgOpacityContent": "10",
      "borderColorContent": "72b42d",
      "fcContent": "ffffff",
      "iconColorContent": "72b42d",
      "bgColorDefault": "4ca20b",
      "bgTextureDefault": "03_highlight_soft.png",
      "bgImgOpacityDefault": "60",
      "borderColorDefault": "45930b",
      "fcDefault": "ffffff",
      "iconColorDefault": "ffffff",
      "bgColorHover": "4eb305",
      "bgTextureHover": "03_highlight_soft.png",
      "bgImgOpacityHover": "50",
      "borderColorHover": "8bd83b",
      "fcHover": "ffffff",
      "iconColorHover": "ffffff",
      "bgColorActive": "285c00",
      "bgTextureActive": "04_highlight_hard.png",
      "bgImgOpacityActive": "30",
      "borderColorActive": "72b42d",
      "fcActive": "ffffff",
      "iconColorActive": "ffffff",
      "bgColorHighlight": "fbf5d0",
      "bgTextureHighlight": "02_glass.png",
      "bgImgOpacityHighlight": "55",
      "borderColorHighlight": "f9dd34",
      "fcHighlight": "363636",
      "iconColorHighlight": "4eb305",
      "bgColorError": "ffdc2e",
      "bgTextureError": "08_diagonals_thick.png",
      "bgImgOpacityError": "95",
      "borderColorError": "fad000",
      "fcError": "2b2b2b",
      "iconColorError": "cd0a0a",
      "bgColorOverlay": "444444",
      "bgTextureOverlay": "08_diagonals_thick.png",
      "bgImgOpacityOverlay": "15",
      "opacityOverlay": "30",
      "bgColorShadow": "aaaaaa",
      "bgTextureShadow": "07_diagonals_small.png",
      "bgImgOpacityShadow": "0",
      "opacityShadow": "30",
      "thicknessShadow": "0px",
      "offsetTopShadow": "4px",
      "offsetLeftShadow": "4px",
      "cornerRadiusShadow": "4px"
    },
    "Flick": {
      "ffDefault": "Helvetica, Arial, sans-serif",
      "fwDefault": "bold",
      "fsDefault": "1.1em",
      "cornerRadius": "2px",
      "bgColorHeader": "dddddd",
      "bgTextureHeader": "03_highlight_soft.png",
      "bgImgOpacityHeader": "50",
      "borderColorHeader": "dddddd",
      "fcHeader": "444444",
      "iconColorHeader": "0073ea",
      "bgColorContent": "ffffff",
      "bgTextureContent": "01_flat.png",
      "bgImgOpacityContent": "75",
      "borderColorContent": "dddddd",
      "fcContent": "444444",
      "iconColorContent": "ff0084",
      "bgColorDefault": "f6f6f6",
      "bgTextureDefault": "03_highlight_soft.png",
      "bgImgOpacityDefault": "100",
      "borderColorDefault": "dddddd",
      "fcDefault": "0073ea",
      "iconColorDefault": "666666",
      "bgColorHover": "0073ea",
      "bgTextureHover": "03_highlight_soft.png",
      "bgImgOpacityHover": "25",
      "borderColorHover": "0073ea",
      "fcHover": "ffffff",
      "iconColorHover": "ffffff",
      "bgColorActive": "ffffff",
      "bgTextureActive": "02_glass.png",
      "bgImgOpacityActive": "65",
      "borderColorActive": "dddddd",
      "fcActive": "ff0084",
      "iconColorActive": "454545",
      "bgColorHighlight": "ffffff",
      "bgTextureHighlight": "01_flat.png",
      "bgImgOpacityHighlight": "55",
      "borderColorHighlight": "cccccc",
      "fcHighlight": "444444",
      "iconColorHighlight": "0073ea",
      "bgColorError": "ffffff",
      "bgTextureError": "01_flat.png",
      "bgImgOpacityError": "55",
      "borderColorError": "ff0084",
      "fcError": "222222",
      "iconColorError": "ff0084",
      "bgColorOverlay": "eeeeee",
      "bgTextureOverlay": "01_flat.png",
      "bgImgOpacityOverlay": "0",
      "opacityOverlay": "80",
      "bgColorShadow": "aaaaaa",
      "bgTextureShadow": "01_flat.png",
      "bgImgOpacityShadow": "0",
      "opacityShadow": "60",
      "thicknessShadow": "4px",
      "offsetTopShadow": "-4px",
      "offsetLeftShadow": "-4px",
      "cornerRadiusShadow": "0px"
    },
    "Pepper Grinder": {
      "ffDefault": "Trebuchet MS, Tahoma, Verdana, Arial, sans-serif",
      "fwDefault": "bold",
      "fsDefault": "1.1em",
      "cornerRadius": "6px",
      "bgColorHeader": "ffffff",
      "bgTextureHeader": "23_fine_grain.png",
      "bgImgOpacityHeader": "15",
      "borderColorHeader": "d4d1bf",
      "fcHeader": "453821",
      "iconColorHeader": "b83400",
      "bgColorContent": "eceadf",
      "bgTextureContent": "23_fine_grain.png",
      "bgImgOpacityContent": "10",
      "borderColorContent": "d9d6c4",
      "fcContent": "1f1f1f",
      "iconColorContent": "222222",
      "bgColorDefault": "f8f7f6",
      "bgTextureDefault": "23_fine_grain.png",
      "bgImgOpacityDefault": "10",
      "borderColorDefault": "cbc7bd",
      "fcDefault": "654b24",
      "iconColorDefault": "b83400",
      "bgColorHover": "654b24",
      "bgTextureHover": "23_fine_grain.png",
      "bgImgOpacityHover": "65",
      "borderColorHover": "654b24",
      "fcHover": "ffffff",
      "iconColorHover": "ffffff",
      "bgColorActive": "eceadf",
      "bgTextureActive": "23_fine_grain.png",
      "bgImgOpacityActive": "15",
      "borderColorActive": "d9d6c4",
      "fcActive": "140f06",
      "iconColorActive": "8c291d",
      "bgColorHighlight": "f7f3de",
      "bgTextureHighlight": "23_fine_grain.png",
      "bgImgOpacityHighlight": "15",
      "borderColorHighlight": "b2a266",
      "fcHighlight": "3a3427",
      "iconColorHighlight": "3572ac",
      "bgColorError": "b83400",
      "bgTextureError": "23_fine_grain.png",
      "bgImgOpacityError": "68",
      "borderColorError": "681818",
      "fcError": "ffffff",
      "iconColorError": "fbdb93",
      "bgColorOverlay": "6e4f1c",
      "bgTextureOverlay": "16_diagonal_maze.png",
      "bgImgOpacityOverlay": "20",
      "opacityOverlay": "60",
      "bgColorShadow": "000000",
      "bgTextureShadow": "16_diagonal_maze.png",
      "bgImgOpacityShadow": "40",
      "opacityShadow": "60",
      "thicknessShadow": "5px",
      "offsetTopShadow": "0",
      "offsetLeftShadow": "-10px",
      "cornerRadiusShadow": "18px"
    },
    "Eggplant": {
      "ffDefault": "Lucida Grande, Lucida Sans, Arial, sans-serif",
      "fwDefault": "bold",
      "fsDefault": "1.1em",
      "cornerRadius": "6px",
      "bgColorHeader": "30273a",
      "bgTextureHeader": "03_highlight_soft.png",
      "bgImgOpacityHeader": "25",
      "borderColorHeader": "231d2b",
      "fcHeader": "ffffff",
      "iconColorHeader": "a8a3ae",
      "bgColorContent": "3d3644",
      "bgTextureContent": "12_gloss_wave.png",
      "bgImgOpacityContent": "30",
      "borderColorContent": "7e7783",
      "fcContent": "ffffff",
      "iconColorContent": "ffffff",
      "bgColorDefault": "dcd9de",
      "bgTextureDefault": "03_highlight_soft.png",
      "bgImgOpacityDefault": "100",
      "borderColorDefault": "dcd9de",
      "fcDefault": "665874",
      "iconColorDefault": "8d78a5",
      "bgColorHover": "eae6ea",
      "bgTextureHover": "03_highlight_soft.png",
      "bgImgOpacityHover": "100",
      "borderColorHover": "d1c5d8",
      "fcHover": "734d99",
      "iconColorHover": "734d99",
      "bgColorActive": "5f5964",
      "bgTextureActive": "03_highlight_soft.png",
      "bgImgOpacityActive": "45",
      "borderColorActive": "7e7783",
      "fcActive": "ffffff",
      "iconColorActive": "454545",
      "bgColorHighlight": "fafafa",
      "bgTextureHighlight": "01_flat.png",
      "bgImgOpacityHighlight": "55",
      "borderColorHighlight": "ffdb1f",
      "fcHighlight": "333333",
      "iconColorHighlight": "8d78a5",
      "bgColorError": "994d53",
      "bgTextureError": "01_flat.png",
      "bgImgOpacityError": "55",
      "borderColorError": "994d53",
      "fcError": "ffffff",
      "iconColorError": "ebccce",
      "bgColorOverlay": "eeeeee",
      "bgTextureOverlay": "01_flat.png",
      "bgImgOpacityOverlay": "0",
      "opacityOverlay": "80",
      "bgColorShadow": "aaaaaa",
      "bgTextureShadow": "01_flat.png",
      "bgImgOpacityShadow": "0",
      "opacityShadow": "60",
      "thicknessShadow": "4px",
      "offsetTopShadow": "-4px",
      "offsetLeftShadow": "-4px",
      "cornerRadiusShadow": "0px"
    },
    "Humanity": {
      "ffDefault": "Helvetica,Arial,sans-serif",
      "fwDefault": "normal",
      "fsDefault": "1.1em",
      "cornerRadius": "6px",
      "bgColorHeader": "cb842e",
      "bgTextureHeader": "02_glass.png",
      "bgImgOpacityHeader": "25",
      "borderColorHeader": "d49768",
      "fcHeader": "ffffff",
      "iconColorHeader": "ffffff",
      "bgColorContent": "f4f0ec",
      "bgTextureContent": "05_inset_soft.png",
      "bgImgOpacityContent": "100",
      "borderColorContent": "e0cfc2",
      "fcContent": "1e1b1d",
      "iconColorContent": "c47a23",
      "bgColorDefault": "ede4d4",
      "bgTextureDefault": "02_glass.png",
      "bgImgOpacityDefault": "70",
      "borderColorDefault": "cdc3b7",
      "fcDefault": "3f3731",
      "iconColorDefault": "f08000",
      "bgColorHover": "f5f0e5",
      "bgTextureHover": "02_glass.png",
      "bgImgOpacityHover": "100",
      "borderColorHover": "f5ad66",
      "fcHover": "a46313",
      "iconColorHover": "f08000",
      "bgColorActive": "f4f0ec",
      "bgTextureActive": "04_highlight_hard.png",
      "bgImgOpacityActive": "100",
      "borderColorActive": "e0cfc2",
      "fcActive": "b85700",
      "iconColorActive": "f35f07",
      "bgColorHighlight": "f5f5b5",
      "bgTextureHighlight": "04_highlight_hard.png",
      "bgImgOpacityHighlight": "75",
      "borderColorHighlight": "d9bb73",
      "fcHighlight": "060200",
      "iconColorHighlight": "cb672b",
      "bgColorError": "fee4bd",
      "bgTextureError": "04_highlight_hard.png",
      "bgImgOpacityError": "65",
      "borderColorError": "f8893f",
      "fcError": "592003",
      "iconColorError": "ff7519",
      "bgColorOverlay": "aaaaaa",
      "bgTextureOverlay": "01_flat.png",
      "bgImgOpacityOverlay": "75",
      "opacityOverlay": "30",
      "bgColorShadow": "aaaaaa",
      "bgTextureShadow": "01_flat.png",
      "bgImgOpacityShadow": "75",
      "opacityShadow": "30",
      "thicknessShadow": "8px",
      "offsetTopShadow": "-8px",
      "offsetLeftShadow": "-8px",
      "cornerRadiusShadow": "8px"
    },
    "Hot sneaks": {
      "ffDefault": "Gill Sans,Arial,sans-serif",
      "fwDefault": "bold",
      "fsDefault": "1.2em",
      "cornerRadius": "4px",
      "bgColorHeader": "35414f",
      "bgTextureHeader": "09_dots_small.png",
      "bgImgOpacityHeader": "35",
      "borderColorHeader": "2c4359",
      "fcHeader": "e1e463",
      "iconColorHeader": "e1e463",
      "bgColorContent": "ffffff",
      "bgTextureContent": "01_flat.png",
      "bgImgOpacityContent": "75",
      "borderColorContent": "aaaaaa",
      "fcContent": "2c4359",
      "iconColorContent": "c02669",
      "bgColorDefault": "93c3cd",
      "bgTextureDefault": "07_diagonals_small.png",
      "bgImgOpacityDefault": "50",
      "borderColorDefault": "93c3cd",
      "fcDefault": "333333",
      "iconColorDefault": "ffffff",
      "bgColorHover": "ccd232",
      "bgTextureHover": "07_diagonals_small.png",
      "bgImgOpacityHover": "75",
      "borderColorHover": "999999",
      "fcHover": "212121",
      "iconColorHover": "454545",
      "bgColorActive": "db4865",
      "bgTextureActive": "07_diagonals_small.png",
      "bgImgOpacityActive": "40",
      "borderColorActive": "ff6b7f",
      "fcActive": "ffffff",
      "iconColorActive": "ffffff",
      "bgColorHighlight": "ffff38",
      "bgTextureHighlight": "10_dots_medium.png",
      "bgImgOpacityHighlight": "80",
      "borderColorHighlight": "b4d100",
      "fcHighlight": "363636",
      "iconColorHighlight": "88a206",
      "bgColorError": "ff3853",
      "bgTextureError": "07_diagonals_small.png",
      "bgImgOpacityError": "50",
      "borderColorError": "ff6b7f",
      "fcError": "ffffff",
      "iconColorError": "ffeb33",
      "bgColorOverlay": "f7f7ba",
      "bgTextureOverlay": "11_white_lines.png",
      "bgImgOpacityOverlay": "85",
      "opacityOverlay": "80",
      "bgColorShadow": "ba9217",
      "bgTextureShadow": "01_flat.png",
      "bgImgOpacityShadow": "75",
      "opacityShadow": "20",
      "thicknessShadow": "10px",
      "offsetTopShadow": "8px",
      "offsetLeftShadow": "8px",
      "cornerRadiusShadow": "5px"
    },
    "Excite Bike": {
      "ffDefault": "segoe ui, Arial, sans-serif",
      "fwDefault": "bold",
      "fsDefault": "1.1em",
      "cornerRadius": "3px",
      "bgColorHeader": "f9f9f9",
      "bgTextureHeader": "03_highlight_soft.png",
      "bgImgOpacityHeader": "100",
      "borderColorHeader": "cccccc",
      "fcHeader": "e69700",
      "iconColorHeader": "5fa5e3",
      "bgColorContent": "eeeeee",
      "bgTextureContent": "06_inset_hard.png",
      "bgImgOpacityContent": "100",
      "borderColorContent": "aaaaaa",
      "fcContent": "222222",
      "iconColorContent": "0a82eb",
      "bgColorDefault": "1484e6",
      "bgTextureDefault": "08_diagonals_thick.png",
      "bgImgOpacityDefault": "22",
      "borderColorDefault": "ffffff",
      "fcDefault": "ffffff",
      "iconColorDefault": "fcdd4a",
      "bgColorHover": "2293f7",
      "bgTextureHover": "08_diagonals_thick.png",
      "bgImgOpacityHover": "26",
      "borderColorHover": "2293f7",
      "fcHover": "ffffff",
      "iconColorHover": "ffffff",
      "bgColorActive": "e69700",
      "bgTextureActive": "08_diagonals_thick.png",
      "bgImgOpacityActive": "20",
      "borderColorActive": "e69700",
      "fcActive": "ffffff",
      "iconColorActive": "ffffff",
      "bgColorHighlight": "c5ddfc",
      "bgTextureHighlight": "07_diagonals_small.png",
      "bgImgOpacityHighlight": "25",
      "borderColorHighlight": "ffffff",
      "fcHighlight": "333333",
      "iconColorHighlight": "0b54d5",
      "bgColorError": "e69700",
      "bgTextureError": "08_diagonals_thick.png",
      "bgImgOpacityError": "20",
      "borderColorError": "e69700",
      "fcError": "ffffff",
      "iconColorError": "ffffff",
      "bgColorOverlay": "e6b900",
      "bgTextureOverlay": "01_flat.png",
      "bgImgOpacityOverlay": "0",
      "opacityOverlay": "30",
      "bgColorShadow": "e69700",
      "bgTextureShadow": "01_flat.png",
      "bgImgOpacityShadow": "0",
      "opacityShadow": "20",
      "thicknessShadow": "0px",
      "offsetTopShadow": "6px",
      "offsetLeftShadow": "6px",
      "cornerRadiusShadow": "3px"
    },
    "Vader": {
      "ffDefault": "Helvetica, Arial, sans-serif",
      "fwDefault": "normal",
      "fsDefault": "1.1",
      "fsDefaultUnit": "em",
      "cornerRadius": "5",
      "cornerRadiusUnit": "px",
      "bgColorHeader": "888888",
      "bgTextureHeader": "04_highlight_hard.png",
      "bgImgOpacityHeader": "15",
      "borderColorHeader": "404040",
      "fcHeader": "ffffff",
      "iconColorHeader": "cccccc",
      "bgColorContent": "121212",
      "bgTextureContent": "12_gloss_wave.png",
      "bgImgOpacityContent": "16",
      "borderColorContent": "404040",
      "fcContent": "eeeeee",
      "iconColorContent": "bbbbbb",
      "bgColorDefault": "adadad",
      "bgTextureDefault": "03_highlight_soft.png",
      "bgImgOpacityDefault": "35",
      "borderColorDefault": "cccccc",
      "fcDefault": "333333",
      "iconColorDefault": "666666",
      "bgColorHover": "dddddd",
      "bgTextureHover": "03_highlight_soft.png",
      "bgImgOpacityHover": "60",
      "borderColorHover": "dddddd",
      "fcHover": "000000",
      "iconColorHover": "c98000",
      "bgColorActive": "121212",
      "bgTextureActive": "05_inset_soft.png",
      "bgImgOpacityActive": "15",
      "borderColorActive": "000000",
      "fcActive": "ffffff",
      "iconColorActive": "f29a00",
      "bgColorHighlight": "555555",
      "bgTextureHighlight": "04_highlight_hard.png",
      "bgImgOpacityHighlight": "55",
      "borderColorHighlight": "404040",
      "fcHighlight": "cccccc",
      "iconColorHighlight": "aaaaaa",
      "bgColorError": "fef1ec",
      "bgTextureError": "02_glass.png",
      "bgImgOpacityError": "95",
      "borderColorError": "cd0a0a",
      "fcError": "cd0a0a",
      "iconColorError": "cd0a0a"
    }
  };

}