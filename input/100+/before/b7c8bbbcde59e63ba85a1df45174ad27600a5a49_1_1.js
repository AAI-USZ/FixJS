function() {
          var trackView;
          _.bindAll(this, 'render', 'draw');
          this.model.bind('change', this.draw);
          this.rover = this.options.rover;
          this.rover.bind('change:min change:max', this.draw);
          // this.model.bind('change:min', this.test);
         // this.template = _.template($('#track-template').html());
          // $('#templates').load("app/templates/track.handlebars", function() {
              // create html
          this.template = Handlebars.compile( $('#track-template').html() );
          // });
       }