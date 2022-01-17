f  var user = userAllowed(this)
    console.log("client filter", clientFilter)
  if(!user) return [];
  var filter = {};
  if(clientFilter) {
    if(clientFilter.type == "sent") filter = {user: user.username}
    if(clientFilter.type == "inbox") filter = {users: user.username}
    if(clientFilter.type == "favorites") filter = {favorites: user.username}
    //if(clientFilter.type == "search") filter = {
  }
  console.log(filter)


  return Signals.find(filter, {
  	title:1, 
  	url: 1, 
  	date: 1, 
    read: 1,
    favorites:1,
  	sort: {date: -1}
  });
  //только те которые имеет право видеть

});
