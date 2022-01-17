function() {
    container_width = parseInt($('#shell-container').css('width'), 10);
    _cmd.css("width", container_width-_uprompt.width()-30);
  }