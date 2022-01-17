function() {
    console.log('asd');

    var data = {
      text: $(this).siblings('.feedback-input').text(),
      image: getUserImage()
    };

    console.log(getUserImage());

    console.log(data);

    $(this).siblings('#comments').append(Mustache.render(commentTemplate, data));
  }