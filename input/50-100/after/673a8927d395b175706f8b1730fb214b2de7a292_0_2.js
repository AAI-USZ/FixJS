function (i, val) {
          var tmpl = self.jade.compile(val.innerHTML),
              loaded_name = val.getAttribute('name');
          self._templates[module][loaded_name] = tmpl;
          if (loaded_name === name) {
            found = tmpl;
          }
        }