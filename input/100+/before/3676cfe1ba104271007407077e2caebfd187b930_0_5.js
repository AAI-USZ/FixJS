function followButtonClicked(event) {
    var button = event.currentTarget;
    if (button.id === 'user_follow_button') {
        var object_type = 'user';
    } else if (button.id === 'dataset_follow_button') {
        var object_type = 'dataset';
    }
    else {
        // This shouldn't happen.
        return;
    }
	var object_id = button.getAttribute('data-obj-id');
    if (button.getAttribute('data-state') === "follow") {
        if (object_type == 'user') {
            var url = '/api/action/follow_user';
        } else if (object_type == 'dataset') {
            var url = '/api/action/follow_dataset';
        } else {
            // This shouldn't happen.
            return;
        }
        var data = JSON.stringify({
          id: object_id,
        });
        var nextState = 'unfollow';
        var nextString = CKAN.Strings.unfollow;
    } else if (button.getAttribute('data-state') === "unfollow") {
        if (object_type == 'user') {
            var url = '/api/action/unfollow_user';
        } else if (object_type == 'dataset') {
            var url = '/api/action/unfollow_dataset';
        } else {
            // This shouldn't happen.
            return;
        }
        var data = JSON.stringify({
          id: object_id,
        });
        var nextState = 'follow';
        var nextString = CKAN.Strings.follow;
    }
    else {
        // This shouldn't happen.
        return;
    }
    $.ajax({
      contentType: 'application/json',
      url: url,
      data: data,
      dataType: 'json',
      processData: false,
      type: 'POST',
      success: function(data) {
        button.setAttribute('data-state', nextState);
        button.innerHTML = nextString;
      },
    });
  }