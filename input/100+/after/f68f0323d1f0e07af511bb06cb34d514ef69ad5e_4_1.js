function() {
          var view = this;
          this.model.set('enabled', true);
          if (namespace.app.parentProject){
              this.model.set('parent', namespace.app.parentProject.id);
              namespace.app.parentProject.set('enabled', false);
              namespace.app.parentProject.save();
              namespace.app.parentProject = null;
          }
          this.model.save({}, {success: function(model, response){
              namespace.app.router.navigate("/projects", true);
          }});

      }