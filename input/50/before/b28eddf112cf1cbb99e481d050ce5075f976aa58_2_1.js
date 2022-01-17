function(_, Backbone) {
  var Message = Backbone.Model.extend({
    url: 'http://localhost:3000/messages'
  });
  return Message;
}