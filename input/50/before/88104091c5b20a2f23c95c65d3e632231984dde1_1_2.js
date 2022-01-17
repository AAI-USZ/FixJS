function(path) {
          var done = this.async();

          window.setTimeout(function() {
            done(_.template($(path).html()));
          }, 15000);
        }