function(_super) {

      __extends(TaskView, _super);

      function TaskView() {
        return TaskView.__super__.constructor.apply(this, arguments);
      }

      TaskView.prototype.template = require('jade!../templates/taskview')();

      TaskView.prototype.events = {
        'click a.delete': 'clickedDelete',
        'click a.delete-confirm': 'confirmDelete'
      };

      TaskView.prototype.clickedDelete = function() {
        return this.$(".deleteModal").modal();
      };

      TaskView.prototype.confirmDelete = function(e) {
        var _this = this;
        e.preventDefault();
        this.$('.delete-confirm').button('loading');
        return this.model.destroy({
          success: function() {
            _this.$(".deleteModal").modal('hide');
            return app.router.navigate('', {
              trigger: true
            });
          }
        });
      };

      TaskView.prototype.serializeData = function() {
        var count, createdDay, firstCheckDay, firstDay, percentComplete, timeAgo, today;
        count = this.model.get('checks').length;
        today = moment();
        createdDay = moment(this.model.get('created_on'));
        firstDay = createdDay;
        if (this.model.get('checks').length) {
          firstCheckDay = moment(this.model.get('checks').sort({
            silent: true
          }).first().get('date'));
          firstDay = moment(Math.min(createdDay.valueOf(), firstCheckDay.valueOf()));
        }
        timeAgo = firstDay.fromNow();
        percentComplete = Math.ceil(count * 100 / today.diff(firstDay, 'days'));
        return _.extend(TaskView.__super__.serializeData.apply(this, arguments), {
          count: count,
          percentComplete: percentComplete,
          timeAgo: timeAgo
        });
      };

      TaskView.prototype.templateHelpers = {
        sentenceCase: function(string) {
          return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        },
        titleCase: function(string) {
          var word;
          return ((function() {
            var _i, _len, _ref, _results;
            _ref = string.split(' ');
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              word = _ref[_i];
              _results.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
            }
            return _results;
          })()).join(' ');
        },
        pluralize: function(word, count) {
          if (count > 0) {
            return word += 's';
          }
        },
        getWeekdaysAsArray: getWeekdaysAsArray,
        gsub: function(source, pattern, replacement) {
          var match, result;
          result = '';
          if (_.isString(pattern)) {
            pattern = RegExp.escape(pattern);
          }
          if (!(pattern.length || pattern.source)) {
            replacement = replacement('');
            replacement + source.split('').join(replacement) + replacement;
          }
          while (source.length > 0) {
            if (match = source.match(pattern)) {
              result += source.slice(0, match.index);
              result += replacement(match);
              source = source.slice(match.index + match[0].length);
            } else {
              result += source;
              source = '';
            }
          }
          return result;
        },
        switchPronouns: function(string) {
          return this.gsub(string, /\b(I am|You are|I|You|Your|My)\b/i, function(pronoun) {
            switch (pronoun[0].toLowerCase()) {
              case 'i':
                return 'you';
              case 'you':
                return 'I';
              case 'i am':
                return "You are";
              case 'you are':
                return 'I am';
              case 'your':
                return 'my';
              case 'my':
                return 'your';
            }
          });
        }
      };

      return TaskView;

    }