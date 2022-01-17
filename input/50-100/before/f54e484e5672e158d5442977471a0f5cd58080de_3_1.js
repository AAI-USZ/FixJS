function( old, new_ ) {
  const oldKey = old.id  || id( old )
      , newKey = new_.id || id( new_ )
  this[ newKey ] = this[ oldKey ]
  delete this[ oldKey ]
  return this[ newKey ]
}