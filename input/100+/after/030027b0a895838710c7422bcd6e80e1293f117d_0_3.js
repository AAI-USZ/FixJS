function() {
          var min = rover.get('min');
          var max = rover.get('max');          

          this.hideError();
          this.showSpinner();

          this.model.center.chart.fetch({
             data: $.param({ min:min, max:max }),
             error: function(chart){ chart.trigger('error') }
          });
       }