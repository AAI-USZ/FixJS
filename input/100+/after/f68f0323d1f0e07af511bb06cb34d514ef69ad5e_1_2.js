function() {
          var route = this;
          var newProject = new Project.Model({
            count: 1,
            startDate: new Date()
          });
          newProject.set('parent', namespace.app.parentProject.id);

        var spawnProjectView = new BaseView.SpawnProject({
            model: newProject
        });
          context.main.setView("#contentAnchor", spawnProjectView);

          spawnProjectView.render(function(){
                spawnProjectView.bind();
          });

          console.log("DATEPICKING");
          $("#dp1").datepicker();
        }