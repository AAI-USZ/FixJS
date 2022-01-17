function( prefix, command, params ) {
  const argCount = arguments.length

  switch ( argCount ) {
    case 2:
      return new Message( null, prefix, command )
    case 1:
      return new Message( null, prefix, [] )
    case 3:
      return new Message( prefix, command, params )
    default:
      throw new Error( "No matching signature" )
  }
}