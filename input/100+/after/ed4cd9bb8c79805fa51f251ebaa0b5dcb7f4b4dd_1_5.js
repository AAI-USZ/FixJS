function(model,options) {
           // check if this view is being scrolled by the user
           // if so, do nothing

           if (options && options.uid != this.el.dataset.uid) {
              if("displayMin" in model._changed || "displayMax" in model._changed || "min" in model._changed || "max" in model._changed) {
                 this.scrollLeft();
              }
           }
        }