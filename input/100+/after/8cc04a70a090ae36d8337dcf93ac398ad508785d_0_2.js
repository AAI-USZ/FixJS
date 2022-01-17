function() {
    var duration = 600;
    var textareaHeight = localConst.TEXTAREA_HEIGHT; // px
    var imgColumnWidth = $('#sidebar-head #head-col1 img').width() +
                         parseInt($('#sidebar-head #head-col1').css('padding-right'), 10);

    $('#head-col1').css('padding-top', (textareaHeight - $('#t1000').height() - 2).toString() + 'px')
      .stop().animate({ 'padding-top' : '0' }, duration);

    $('#status-form').fadeOut(duration);

    $('#head-col2-row1').css({
      'border': 'none',
      'padding': '0',
      'height': textareaHeight.toString() + 'px',
      'margin-left': '-' + imgColumnWidth.toString() + 'px',
      'max-height': textareaHeight.toString() + 'px' }).stop()
      .animate({ 'height': '16px', 'margin-left': '0', 'max-height': '26px' }, duration, 'linear',
          function() {
            $('#status-form').remove();
            $(this).css({
              'border': 'solid 1px #ccc',
              'padding': '0 2px',
              'height': ''
            });
          });

    $('#head-col2-row1').click(setStatusAreaClicked);
  }