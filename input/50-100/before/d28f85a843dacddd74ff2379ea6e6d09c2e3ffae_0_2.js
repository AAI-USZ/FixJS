function() {
    var data = {
      text: $(this).siblings('.feedback-input').val(),
      image: getUserImage()
    };

    console.log(data);

    $(this).siblings('#comments').append(Mustache.render(commentTemplate, data));
  }