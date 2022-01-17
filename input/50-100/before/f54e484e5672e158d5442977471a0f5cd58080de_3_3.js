function( prsn ) {
  const oldp  = this.get( prsn )
      , newp  = oldp ? null : prsn instanceof Person
                     ? prsn : person( prsn )
  if ( oldp )
    return oldp
  return this[ newp.id ] = newp
}