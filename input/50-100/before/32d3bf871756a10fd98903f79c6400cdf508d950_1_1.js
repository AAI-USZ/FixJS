function(onComplete) {  
  try {
    this.func.apply(this.spec);
  } catch (e) {
    this.spec.fail(e);
  }
  onComplete();
}