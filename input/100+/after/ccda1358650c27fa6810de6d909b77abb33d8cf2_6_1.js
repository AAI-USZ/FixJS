function() {
        var extendInstanceArguments,
          _this = this;
        extendInstanceArguments = function() {
          return _this.instanceArguments = _.extend(_this.instanceArguments, {
            jumbleName: $('#name').val(),
            jumbleTags: $('#tags').val()
          });
        };
        if (this.instanceArguments['jumbleName']) {
          $('input#name').val(this.instanceArguments['jumbleName']);
        }
        if (this.instanceArguments['jumbleTags']) {
          $('input#tags').val(this.instanceArguments['jumbleTags']);
        }
        return $('#newJumbleForm').submit(function() {
          extendInstanceArguments();
          fimo.controller['jumbleObject'](_this.instanceArguments);
          return false;
        });
      }