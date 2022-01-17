function() {
        var _this = this;
        if (this.instanceArguments['jumbleName']) {
          $('input#name').val(this.instanceArguments['jumbleName']);
        }
        if (this.instanceArguments['jumbleTags']) {
          $('input#tags').val(this.instanceArguments['jumbleTags']);
        }
        return $('#newJumbleForm').submit(function() {
          fimo.page.create(fimo.views.jumbleObject(_.extend(_this.instanceArguments, {
            jumbleName: $('input#name').val(),
            jumbleTags: $('input#tags').val()
          })));
          return false;
        });
      }