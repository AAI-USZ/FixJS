function() {
      var _this = this;
      if (window.console) {
        this.console = window.console;
      } else {
        this.console = {
          info: function() {},
          error: function() {},
          log: function() {}
        };
      }
      this.element.html("<div tts=\"" + this.options.read + "\" class=\"explain\">" + this.options.html + "</div>");
      this.explainPanel = this.element.find('.explain');
      return this.options.domInit(this.explainPanel, function() {
        var options;
        options = _.extend(_this.options.ttsOptions, {
          mode: 'auto',
          beforeDialog: function() {
            return _this.explainPanel.ttswidget('getInnerContentElement', function(innerContent) {
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
    }