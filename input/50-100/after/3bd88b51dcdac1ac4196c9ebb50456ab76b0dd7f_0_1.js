function(){
  var __ref, __ref1;
  if (((__ref = (__ref = this.tokens)[__ref.length - 2 - ((__ref1 = this.last[0]) === 'NEWLINE' || __ref1 === 'INDENT')]) != null ? __ref[0] : void 8) === 'FOR') {
    return this.seenFor = false, this.seenFrom = true, this;
  }
}