function(rawComp) {
          var comp;
          if (rawComp instanceof Backbone.Model) {
            comp = rawComp.clone();
            hydratedComps.push(comp);
          } else {
            switch (rawComp.type) {
              case "ImageModel":
                comp = CompnentFactory.createImage(rawComp);
                hydratedComps.push(comp);
                break;
              case "TextBox":
                comp = CompnentFactory.createTextBox(rawComp);
                hydratedComps.push(comp);
            }
          }
          return _this._registerWithComponent(comp);
        }