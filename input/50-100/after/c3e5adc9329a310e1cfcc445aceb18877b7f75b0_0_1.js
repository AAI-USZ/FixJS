function(message) {
    // should move to a template eventually...
    if (message.data && typeof(message.data) === "string") {
      // it's a JSON message from Google.
      message = JSON.parse(message.data);
    }
    var li = $('<li class="message"></li>');
    li.append('<img src="'+message.picture_url+'" class="profile-image"/>');
    li.append('<h4 class="username">'+message.username+'</h4>');
    var p = $('<p class="message-content"></p>');
    p.text(message.message);
    li.append(p);
    return li;
  }