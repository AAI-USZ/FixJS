function( type ) {
  if ( ! this.has( type ) )
    return false
  const oarr  = this.get( type )
      , args  = Array.apply( null, arguments )
  args.shift() // Plop off type, leaving args for Observers
  var l = oarr.length
    , o = null
    , i = 0
    , s = 0
  logger.log( LEVEL.DEBUG, "[DEBUG] Notifying %d observers about %s", l, type )
  // Somewhat nasty
  while ( i !== l ) {
    o = oarr[i]
    s = o.notify.apply( null, args )
    if ( s & STATUS.ERROR )
      logger.log( LEVEL.DEBUG, "[DEBUG] Handler %s for %s returned ERROR", o.toString(), type )
    if ( s & STATUS.REMOVE ) {
      removeIndex.call( this, type, i )
      --l
      continue
    }
    if ( s & STATUS.STOP )
      continue
    ++i
  }
  return true
}