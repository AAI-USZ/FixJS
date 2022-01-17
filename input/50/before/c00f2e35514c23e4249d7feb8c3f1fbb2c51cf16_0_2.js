function () {
    Todos.update(this._id, {$set: {
      privateTo: Meteor.default_connection.userId()
    }});
  }