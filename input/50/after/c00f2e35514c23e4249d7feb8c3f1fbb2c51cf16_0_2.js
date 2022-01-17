function () {
    Todos.update(this._id, {$set: {
      privateTo: Meteor.user()._id
    }});
  }