function(){
  if (this.head.prev === this.head) return
  var n = this.head.prev.remove()
  this.length -= 1
  return n.data
}