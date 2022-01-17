function(e) {
        var _this = this;
        e.preventDefault();
        this.$('.delete-confirm').button('loading');
        return this.model.destroy({
          success: function() {
            _this.$(".deleteModal").modal('hide');
            return app.router.navigate('', {
              trigger: true
            });
          }
        });
      }