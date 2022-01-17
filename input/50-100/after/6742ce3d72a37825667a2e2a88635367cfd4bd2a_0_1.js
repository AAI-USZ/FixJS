function(){
  if (this.length === 0 ) return

  //no node points to head; not necessary for GC, but it makes me feel better.
  this.head.next.prev = null
  this.head.prev.next = null

  //head only points to itself; as a fresh node would
  this.head.next = this.head
  this.head.prev = this.head

  return
}