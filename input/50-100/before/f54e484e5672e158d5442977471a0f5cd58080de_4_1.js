function( shared ) {
  const map = shared ? _observers : {}
  this.add    = add.bind( map )
  this.notify = notify.bind( map )
  this.remove = remove.bind( map )
  this.clear  = clear.bind( map )
}