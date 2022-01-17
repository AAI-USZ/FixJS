function() {
    var image_to_change = selector.config.selected_content_container.find('img.content_image');
    var text_to_change = selector.config.selected_content_container.find('div.title')

    var clicked_image = $(this);
    var new_src = clicked_image.attr('src')
    var new_text = clicked_image.parent().parent().find("div.title").text();

    image_to_change.attr('src', new_src);
    text_to_change.text(new_text);

    var selected_content_id = clicked_image.attr('data-content-id');
    var selected_content;
    for(var i = 0; i < selector.contents.length; i++) {
      var temp = selector.contents[i];
      if(temp.id == selected_content_id) {
        selected_content = temp;
        break;
      }
    }
    // selector.config.current_test.words = selected_content.body.split(" ").reverse();
    selector.config.current_test.text = selected_content.body;
    selector.config.current_test.content_id = selected_content.id;
    return false;
  }