function(){
  var n = this.head.prev.remove()
  this.length -= 1
  return n.data
}