function(name, tagName, declaration) {
  this.name = name;
  this.extends = tagName;
  this.lifecycle = this.lifecycle.bind(declaration);
}