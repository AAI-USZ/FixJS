function() {
    var data = {
      text: $(this).siblings('.feedback-input').val(),
      image: userImage
    };

    $(this).siblings('.comments').append(Mustache.render(commentTemplate, data));
  }