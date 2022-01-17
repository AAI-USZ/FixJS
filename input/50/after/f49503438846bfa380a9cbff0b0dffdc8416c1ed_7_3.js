function createActivation(method) {
    return Object.create(method.activationPrototype);
  }