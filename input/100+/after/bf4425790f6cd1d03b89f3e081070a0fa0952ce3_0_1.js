function(_super) {

      __extends(InfoForm, _super);

      function InfoForm() {
        return InfoForm.__super__.constructor.apply(this, arguments);
      }

      InfoForm.prototype.template = require('jade!../templates/info-form')();

      InfoForm.prototype.events = {
        'click button[type="submit"]': 'commitChanges'
      };

      InfoForm.prototype.commitChanges = function(e) {
        var errors;
        e.preventDefault();
        e.stopPropagation();
        errors = this.commit();
        if (errors == null) {
          return this.model.save({}, {
            success: function() {
              return app.vent.trigger('notice', 'Your info has been updated.');
            }
          });
        }
      };

      InfoForm.prototype.schema = {
        name: {
          title: 'Name',
          type: 'Text',
          validators: ['required']
        },
        email: {
          title: 'Email',
          type: 'Text',
          validators: ['email', 'required']
        },
        starting_weekday: {
          title: 'Weeks start on',
          type: ButtonRadio,
          options: function(callback) {
            var day;
            return callback((function() {
              var _i, _results;
              _results = [];
              for (day = _i = 0; _i <= 6; day = ++_i) {
                _results.push({
                  val: day,
                  label: moment().day(day).format('ddd').slice(0, 1)
                });
              }
              return _results;
            })());
          }
        },
        timezone: {
          title: 'Timezone',
          type: Timezone,
          options: function(callback) {
            return $.get('/api/timezones', function(data) {
              var result;
              result = _.map(data, function(obj) {
                return {
                  val: _.keys(obj)[0],
                  label: _.values(obj)[0]
                };
              });
              return callback(result);
            });
          }
        },
        email_permission: {
          title: 'Do you want to receive email updates about Standards?',
          type: 'Checkbox'
        }
      };

      InfoForm.prototype.fieldsets = [
        {
          legend: 'Info',
          fields: ['name', 'email', 'starting_weekday', 'timezone', 'email_permission']
        }
      ];

      return InfoForm;

    }