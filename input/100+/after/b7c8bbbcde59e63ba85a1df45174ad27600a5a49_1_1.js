function() {
          var trackView;
          _.bindAll(this, 'render', 'draw', 'edit', 'fetching');
          var self = this;
          this.model.bind('change', this.draw);
          this.model.bind('change:name', function(){self.$('.track-edit-label').html(self.model.get('name'));});
          this.model.bind('change:edit', this.edit);
          this.model.bind('fetching', this.fetching);
          this.model.bind('change:chromosome', function() {
             self.model.center.chart.fetch({data: $.param({min:rover.get('min'), max:rover.get('max')})});
          });
          this.rover = this.options.rover;
          this.rover.bind('change:min', this.draw);
          this.model.center.chart.bind('change:features', this.draw);
          // this.model.bind('change:min', this.test);
         // this.template = _.template($('#track-template').html());
          // $('#templates').load("app/templates/track.handlebars", function() {
              // create html
          this.template = Handlebars.compile( $('#track-template').html() );
          // });
       }