function(component, prototypeName) {
    Luca.trigger("component:registered", component, prototypeName);
    return registry.classes[component] = prototypeName;
  }