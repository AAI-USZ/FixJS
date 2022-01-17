function( shared ) {
  if ( shared && ! _observers )
    _observers = new Map()
  const map = shared ? _observers : new Map()
  this.add    = add.bind( map )
  this.get    = get.bind( map )
  this.notify = notify.bind( map )
  this.remove = remove.bind( map )
}