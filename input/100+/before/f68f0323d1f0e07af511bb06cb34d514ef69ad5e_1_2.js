function() {
          var route = this;
          var newProject = new Project.Model({});
          newProject.set('parent', namespace.app.parentProject.id);

        var spawnProjectView = new BaseView.SpawnProject({
            model: newProject
        });
          context.main.setView("#contentAnchor", spawnProjectView);

          spawnProjectView.render();
          ModelBinding.bind(context.spawnProjectView);
          console.log("DATEPICKING");
          $("#dp1").datepicker();
        }