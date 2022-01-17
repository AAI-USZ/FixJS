function() {
          this.setElement($("#activity-feed"));
          $(this.el).html(this.template(this.model.toJSON()));
          
          this.activitiesView.el = this.$('.activities-updating-collection');
          this.activitiesView.render();

          return this;
        }