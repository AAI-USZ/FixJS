function() {
  var user = userAllowed(this)

  if(!user) return [];
  var me = this;
  var uuid = Meteor.uuid();
  var findCursor = Signals.find({read: {$ne:  user.username}, user: {$ne: user.username} });
  var sendCount = function() {
    var count = findCursor.count();
    me.set("counts", uuid, {count: count});
    me.flush();
  }

  var signalHandle = findCursor.observe({
    added: sendCount,
    removed: sendCount
  });

  this.onStop(function () {
    signalHandle.stop();
    me.unset("counts", uuid, ["count"]);
    me.flush();
  });



}