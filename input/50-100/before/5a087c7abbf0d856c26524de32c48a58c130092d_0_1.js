function (selector, values) {
  if (!selector) {
    throw new Error('no selector defined.');
  }
  
  if (JarallaxTools.isValues(values))
  {
    var newDefault = new JaralaxObject(selector, values);
    newDefault.activate();
    this.defaultValues.push(newDefault);
  }
}