function(e) {
        var con, _ref;
        e.preventDefault();
        e.stopPropagation();
        if (this.chosen != null) {
          con = {
            path: this.chosen.toString()
          };
          this.newCon = new intermine.query.NewConstraint(this.query, con);
          this.newCon.render().$el.insertAfter(this.el);
          this.$('.btn-primary').fadeOut('slow');
          if ((_ref = this.$pathfinder) != null) {
            _ref.remove();
          }
          this.$pathfinder = null;
          return this.query.trigger('editing-constraint');
        } else {
          return console.log("Nothing chosen");
        }
      }