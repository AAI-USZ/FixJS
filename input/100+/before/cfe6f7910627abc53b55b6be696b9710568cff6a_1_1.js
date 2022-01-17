function () {
  if (Meteor.default_connection.userId()) {
    // XXX full identity?
    return {_id: Meteor.default_connection.userId()};
  } else {
    return null;
  }
}