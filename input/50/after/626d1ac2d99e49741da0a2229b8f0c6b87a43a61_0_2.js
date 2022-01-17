function() {
    return Rooms.find({}, {$sort: {entered_at: 1}});
  }