function(code) {
            var created, model;
            model = snapshot("" + __dirname + "/templates/new_default_project");
            created = snapshot("" + __dirname + "/tmp/new_default_project");
            return _this.callback(null, model, created);
          }