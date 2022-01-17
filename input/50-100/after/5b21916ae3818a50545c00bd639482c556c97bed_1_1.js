function(rawComp) {
          var comp;
          if (rawComp instanceof Backbone.Model) {
            comp = rawComp.clone();
            hydratedComps.push(comp);
          } else {
            comp = ComponentFactory.create(rawComp);
            hydratedComps.push(comp);
          }
          return _this._registerWithComponent(comp);
        }