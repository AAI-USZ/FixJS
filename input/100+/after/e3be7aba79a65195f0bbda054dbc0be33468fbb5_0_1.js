function(err, room, players) {
    model.ref('_room', room)
    model.ref('_player', players.at(userId))
    
    players.setNull('numOfPlayers', 0)
    
    if (players.get(userId)) {
      console.log('player exists!')
      console.log('player: '+players.get(userId))
      players.set('numOfPlayers', Object.keys(players.get()).length)
    } else {
      console.log('adding player: '+userId)
      players.set(userId, {property: "yes!"})
      players.set('numOfPlayers', Object.keys(players.get()).length)
    }

    //console.log(Object.keys(players.get()).length)
    console.log(model.get())
    
    
    // setNull will set a value if the object is currently null or undefined
    room.setNull('welcome', 'Welcome to ' + roomName + '!')

    room.incr('visits')

    // This value is set for when the page initially renders
    model.set('_timer', '0.0')
    // Reset the counter when visiting a new route client-side
    start = +new Date()

    // Render will use the model data as well as an optional context object
    page.render({
      roomName: roomName
    , randomUrl: parseInt(Math.random() * 1e9).toString(36)
    })
  }