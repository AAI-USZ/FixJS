function(){
  if (this.head.next = this.head) return
  var n = this.head.next.remove()
  this.length -= 1
  return n.data
}