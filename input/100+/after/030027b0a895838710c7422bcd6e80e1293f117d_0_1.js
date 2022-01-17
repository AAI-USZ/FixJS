function() {
          var trackView;
          _.bindAll(this, 'render', 'draw', 'edit', 'showSpinner', 'hideSpinner', 'showError', 'hideError', 'refetch');
          var self = this;
          this.model.bind('change', this.draw);
          this.model.bind('change:name', function(){self.$('.track-edit-label').html(self.model.get('name'));});
          this.model.bind('change:edit', this.edit);
          this.model.bind('fetching', this.showSpinner);
          this.model.bind('fetched', this.hideSpinner);
          this.model.bind('hellochase', this.showError);
          this.model.bind('change:chromosome', function() {
             self.model.center.chart.fetch({
                data: $.param({min:rover.get('min'), max:rover.get('max')}),
                error: function(chart){ chart.trigger('error') }
             });
          });
          this.rover = this.options.rover;
          this.rover.bind('change', this.draw);
          this.model.center.chart.bind('change:features', this.draw);
          this.model.center.chart.bind('error', this.showError);
          // create html
          this.template = Handlebars.compile( $('#track-template').html() );
       }