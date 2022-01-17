function () {
    return Players.find({team_id:1}, {sort: {score: -1, name: 1}});
  }