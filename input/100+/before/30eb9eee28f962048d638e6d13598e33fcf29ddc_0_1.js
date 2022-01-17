function message_displayed(p)
  {
    // show a popup dialog on errors
    if (p.type == 'error') {
      if (!me.messagedialog) {
        me.messagedialog = $('<div>').addClass('popupdialog');
      }

      var pos = $(p.object).offset();
      pos.top -= (rcmail.env.task == 'login' ? 20 : 160);
      me.messagedialog.dialog('close');
      me.messagedialog.html(p.message)
        .dialog({
          resizable: false,
          closeOnEscape: true,
          dialogClass: 'popupmessage ' + p.type,
          title: env.errortitle,
          close: function() {
            me.messagedialog.dialog('destroy').hide();
          },
          position: ['center', pos.top],
          hide: { effect:'drop', direction:'down' },
          width: 420,
          minHeight: 90
        }).show();

      window.setTimeout(function(){ me.messagedialog.dialog('close'); }, Math.max(2000, p.timeout / 2));
    }
  }