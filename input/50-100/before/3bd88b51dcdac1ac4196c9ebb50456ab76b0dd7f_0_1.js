function(){
  var __ref;
  return ((__ref = (__ref = this.tokens)[__ref.length - 2]) != null ? __ref[0] : void 8) === 'FOR' && (this.seenFor = false, this.seenFrom = true, this);
}