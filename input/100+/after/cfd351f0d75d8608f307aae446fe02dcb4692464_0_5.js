function(friends) {
    this.clear();

    var i = 0;
    for (var id in friends) {
      if (i > 4) {
        break;
      }

      var friendId = id;
      var friendName = friends[id];

      var friendDiv = $('<div class="fac-item" data-facebook-id="' + friendId + '"></div>');
      var friendImg = $('<img src="//graph.facebook.com/' + friendId + '/picture" />');
      var friendName = $('<div class="fac-name">' + friendName + '</div>');

      friendDiv.append(friendImg);
      friendDiv.append(friendName);

      $(this.containerSelector).append(friendDiv);

      i++;
    }

    if (i > 0) {
      var footer = $('<div class="fac-footer"> Showing results for ' + $(this.input).val() + '</div>');
      $(this.containerSelector).append(footer);
    }
    else {
      var footer = $('<div class="fac-footer">No friends for ' + $(this.input).val() + ' :-(</div>');
      $(this.containerSelector).append(footer);
    }
  }