function(json, status) {
    var c = $('#contributors');
    c.empty();

    for (var i in json) {
      var u = json[i];
      c.append(
        $('<div>').addClass('contributor_profile')
        .append(
          $('<img>').attr('src', 'http://www.gravatar.com/avatar/'+u.gravatar_id+'?s=134')
        ).append($('<div>').addClass('github')
                 .append($('<a>').attr('href', 'http://github.com/'+u.login).html(u.login)
                 )
        )
      );
    }
  }