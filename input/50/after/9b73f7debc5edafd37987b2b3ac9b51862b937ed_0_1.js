function(name, tagName, declaration) {
  this.name = name;
  this.extendsTagName = tagName;
  this.lifecycle = this.lifecycle.bind(declaration);
}