function() {
  return Meteor.default_connection.userId() !== null;
}