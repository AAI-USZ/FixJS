function( chan, err ) {
    // It has now joined the channel, and we get a `Channel` object.
    // You can `say` stuff in the channel, maybe `setTopic` to something nice.
    chan.say( "Hello!" )
        .say( fmt( "What kind of topic is “%s”? I will fix it.", chan.topic ) )
        .setTopic( fmt( "%s was here @ %s", bot.user.nick, new Date() ) )
    // A `Channel` contains `Person` objects (unless it's empty, of course).
    // You can access these through the `people` property.
    chan.people.has( "nlogax" )                     // Is nlogax in the channel?
      ? chan.say( "nlogax: I red{♥} U".colorize() ) // If so, show appreciation for your creator.
      : chan.invite( "nlogax", "WHERE R U" )        // If not, try to invite nlogax.
  }