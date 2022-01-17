function() {
          this.setElement($("#activity-feed"));
          $(this.el).html(this.template(this.model.toJSON()));
          
          this.activityFeed.el = this.$('.activities');
          this.activityFeed.render();

          return this;
        }