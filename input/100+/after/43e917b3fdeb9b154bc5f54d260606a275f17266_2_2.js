function( command, predicate, handler ) {
  const args = []
  args.push.apply( args, arguments )
  handler   = args.pop()
  predicate = args.pop()
  command   = args.pop() || COMMAND.PRIVMSG
  const isFunc = predicate instanceof Function
      , regExp = isFunc ? null : predicate.constructor === String ? RegExp( predicate, "i" ) : predicate
      , predic = isFunc ? predicate : matchMessage.bind( this, regExp )
  return lookFor.call( this, command, predic, handler )
}