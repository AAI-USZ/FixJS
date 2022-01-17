function(code) {
          var model;
          model = fs.readFileSync(template, "utf-8");
          created = fs.readFileSync(created, "utf-8");
          return _this.callback(model, created);
        }