function(code) {
            var created, model;
            model = snapshot("" + __dirname + "/templates/new_custom_project");
            created = snapshot("" + __dirname + "/tmp/new_custom_project");
            return _this.callback(model, created);
          }