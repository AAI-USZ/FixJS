function(ev) {
    console.assert(this == document.getElementById('head-col2-row1'));

    $(this).unbind('click');

    var duration = 600; // ms
    var textareaHeight = localConst.TEXTAREA_HEIGHT; // px
    var imgColumnWidth = $('#sidebar-head #head-col1 img').width() +
                         parseInt($('#sidebar-head #head-col1').css('padding-right'), 10);

    var prevStatus = $(this).text().trim();
    self.statusToSetOnCancel = prevStatus;
    self.isEditingStatus = true;
    if (prevStatus == 'Set your status here.')
      prevStatus = '';

    $('#head-col2-row1').css({
      'border': 'none',
      'padding': '0',
      'max-height': '26px'
    }).stop().text('')
    .animate({ 'margin-left': '-' + imgColumnWidth.toString() + 'px',
               'height'     : textareaHeight.toString() + 'px',
               'max-height' : textareaHeight.toString() + 'px',
             }, duration);

    $('<form id="status-form" style="margin:0; padding:0; width:100%; height:100%; display:-webkit-box; -webkit-box-orient: vertical">' +
        '<div style="-webkit-box-flex:1; position:relative">' +
        '<textarea id="status-input-area" style="position:absolute; left:0; top:0; right:0; bottom:0" wrap="soft" autofocus></textarea></div>' +
        '<div id="t1000" style="margin: 2px 0; text-align:right">' +
          '<button id="cancel-but" class="small-button">Cancel</button>' +
          '<input class="small-button" type="submit" value="Post" />' +
        '</div>' +
      '</form>').hide()
      .appendTo($('#head-col2-row1')).fadeIn(duration);

    $('#head-col1').css('padding-top', '0').stop()
      .animate({ 'padding-top': (textareaHeight - $('#t1000').height() - 2).toString() + 'px' }, duration);

    // $('#status-form').resize(function() {
    //   $('#status-input-area').height($('#status-input-area').parent().height());
    // });

    $('#status-input-area').val(prevStatus).select();

    $('#status-form').submit(statusSubmitted);
    $('#cancel-but').click(function (ev) {
      console.assert(self.statusToSetOnCancel);
      console.assert(self.isEditingStatus);

      returnToShowingStatus();
      setTimeout(function () {
          $('#head-col2-row1').text(self.statusToSetOnCancel);
          self.isEditingStatus = false;
        }, 600);

      ev.stopPropagation();
      return false;
    });

    $('#status-input-area').keypress(function(ev) {
      if (ev.which == 13 && $(this).val()) {
        $('#status-form').submit();
      }
    });
  }