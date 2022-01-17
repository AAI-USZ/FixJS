function(component, prototypeName, componentType) {
    if (componentType == null) componentType = "view";
    Luca.trigger("component:registered", component, prototypeName);
    return registry.classes[component] = prototypeName;
  }