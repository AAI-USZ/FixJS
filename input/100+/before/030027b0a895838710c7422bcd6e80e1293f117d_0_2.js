function(e) {
         this.model.set({
            name: this.$('.track-edit-name').val(),
            url: this.$('.track-edit-urlInput').val(),
            typefilter: this.$('.track-edit-typefilter').val(),
            segment: this.$('.track-edit-chromosome').val(),
            edit: false
         });
         
         this.model.center.chart.fetch({data: $.param({min:rover.get('min'), max:rover.get('max')})});
       }