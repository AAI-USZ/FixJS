function(Backbone, SpatialObject, CompnentFactory, Math2) {
  var defaults;
  defaults = {
    z: 0,
    impScale: 1,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0
  };
  return SpatialObject.extend({
    initialize: function() {
      var components, hydratedComps,
        _this = this;
      components = this.get("components");
      if (!(components != null)) {
        this.set("components", []);
      } else {
        hydratedComps = [];
        this.set("components", hydratedComps);
        components.forEach(function(rawComp) {
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
        });
      }
      _.defaults(this.attributes, defaults);
      return this.on("unrender", this._unrendered, this);
    },
    _unrendered: function() {
      return this.get("components").forEach(function(component) {
        return component.trigger("unrender", true);
      });
    },
    _registerWithComponent: function(component) {
      component.on("dispose", this.remove, this);
      component.on("change:selected", this.selectionChanged, this);
      return component.on("change", this.componentChanged, this);
    },
    getPositionData: function() {
      return {
        x: this.attributes.x,
        y: this.attributes.y,
        z: this.attributes.z,
        impScale: this.attributes.impScale,
        rotateX: this.attributes.rotateX,
        rotateY: this.attributes.rotateY,
        rotateZ: this.attributes.rotateZ
      };
    },
    add: function(component) {
      this._placeComponent(component);
      this.attributes.components.push(component);
      this._registerWithComponent(component);
      this.trigger("contentsChanged");
      return this.trigger("change:components.add", this, component);
    },
    /**
    		* A pretty naive implementation but it should do the job just fine.
    		* Places a new component in a location that doesn't currently contain a component
    		* @method _placeComponent
    		* @param {Component} component The component to be placed
    		*
    */

    _placeComponent: function(component) {
      return this.attributes.components.forEach(function(existingComponent) {
        var existingX, existingY;
        existingX = existingComponent.get("x");
        existingY = existingComponent.get("y");
        if (Math2.compare(existingX, component.get("x"), 5) && Math2.compare(existingY, component.get("y"), 5)) {
          return component.set({
            x: existingX + 20,
            y: existingY + 20
          });
        }
      });
    },
    dispose: function() {
      this.set({
        active: false,
        selected: false
      });
      this.trigger("dispose", this);
      return this.off("dispose");
    },
    remove: function(component) {
      var idx;
      idx = this.attributes.components.indexOf(component);
      if (idx !== -1) {
        this.attributes.components.splice(idx, 1);
        this.trigger("contentsChanged");
        this.trigger("change:components.remove", this, component);
        component.trigger("unrender");
        return component.off(null, null, this);
      }
    },
    componentChanged: function(model, value) {
      return this.trigger("contentsChanged");
    },
    unselectComponents: function() {
      if (this.lastSelection) {
        return this.lastSelection.set("selected", false);
      }
    },
    selectionChanged: function(model, selected) {
      if (selected) {
        if (this.lastSelection !== model) {
          this.attributes.components.forEach(function(component) {
            if (component !== model) {
              return component.set("selected", false);
            }
          });
          this.lastSelection = model;
        }
        return this.trigger("change:activeComponent", this, model, selected);
      } else {
        this.trigger("change:activeComponent", this, null);
        return this.lastSelection = null;
      }
    },
    constructor: function Slide() {
			SpatialObject.prototype.constructor.apply(this, arguments);
		}
  });
}