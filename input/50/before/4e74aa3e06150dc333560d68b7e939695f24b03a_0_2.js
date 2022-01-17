function(){
  var n = this.head.next.remove()
  this.length -= 1
  return n.data
}