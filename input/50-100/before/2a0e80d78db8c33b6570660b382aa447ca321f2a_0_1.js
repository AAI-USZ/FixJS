function() {
    console.log('asd');

    var data = {
      text: $(this).siblings('.feedback-input').text(),
      image: getUserImage()
    }

    $(this).siblings('#comments').append($(Mustache.render(commentTemplate, data)));
  }