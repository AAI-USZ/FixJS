function( old, new_ ) {
  const oldKey = old.id  || id( old )
      , newKey = new_.id || id( new_ )
  this.map.set( newKey, this.map.get( oldKey ) )
  this.map.delete( oldKey )
  return this.map.get( newKey )
}