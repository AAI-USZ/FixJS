function (name, base) {
  if (this.prefix_registry[ name ])
      throw new Rx.Error("the prefix '" + name + "' is already registered");

  this.prefix_registry[ name ] = base;
}