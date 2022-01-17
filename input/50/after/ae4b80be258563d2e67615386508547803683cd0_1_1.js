function () {
    return Players.find({name:'Lucas Mills'}, {sort: {score: -1, name: 1}});
  }