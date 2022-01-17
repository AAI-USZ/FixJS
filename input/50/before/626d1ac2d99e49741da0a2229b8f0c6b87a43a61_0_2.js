function() {
    return Rooms.find({}, {sort: {name: 1}});
  }