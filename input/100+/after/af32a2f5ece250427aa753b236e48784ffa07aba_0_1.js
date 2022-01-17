function init()
  {
    rcmail.addEventListener('message', message_displayed);

    /***  mail task  ***/
    if (rcmail.env.task == 'mail') {
      rcmail.addEventListener('menu-open', show_listoptions);
      rcmail.addEventListener('menu-save', save_listoptions);
      rcmail.addEventListener('responseafterlist', function(e){ switch_view_mode(rcmail.env.threading ? 'thread' : 'list') });

      var dragmenu = $('#dragmessagemenu');
      if (dragmenu.length) {
        rcmail.gui_object('message_dragmenu', 'dragmessagemenu');
        popups.dragmessagemenu = dragmenu;
      }

      if (rcmail.env.action == 'show' || rcmail.env.action == 'preview') {
        layout_messageview();
        rcmail.addEventListener('aftershow-headers', function() { layout_messageview(); });
        rcmail.addEventListener('afterhide-headers', function() { layout_messageview(); });
        $('#previewheaderstoggle').click(function(e){ toggle_preview_headers(this); return false });
      }
      else if (rcmail.env.action == 'compose') {
        rcmail.addEventListener('aftertoggle-editor', function(){ window.setTimeout(function(){ layout_composeview() }, 200); });
        rcmail.addEventListener('aftersend-attachment', show_uploadform);
        rcmail.addEventListener('add-recipient', function(p){ show_header_row(p.field, true); });
        layout_composeview();

        // Show input elements with non-empty value
        var field, fields = ['cc', 'bcc', 'replyto', 'followupto'];
        for (var f=0; f < fields.length; f++) {
          if ((field = $('#_'+fields[f])) && field.length && field.val() != '')
            show_header_row(fields[f], true);
        }

        $('#composeoptionstoggle').parent().click(function(){
          $('#composeoptionstoggle').toggleClass('enabled');
          $('#composeoptions').toggle();
          layout_composeview();
          return false;
        }).css('cursor', 'pointer');

        new rcube_splitter({ id:'composesplitterv', p1:'#composeview-left', p2:'#composeview-right',
          orientation:'v', relative:true, start:248, min:170, size:12, render:layout_composeview }).init();
      }
      else if (rcmail.env.action == 'list' || !rcmail.env.action) {
        var previewframe = $('#mailpreviewframe').is(':visible');
        $('#mailpreviewtoggle').addClass(previewframe ? 'enabled' : 'closed').click(function(e){ toggle_preview_pane(e); return false });
        $('#maillistmode').addClass(rcmail.env.threading ? '' : 'selected').click(function(e){ switch_view_mode('list'); return false });
        $('#mailthreadmode').addClass(rcmail.env.threading ? 'selected' : '').click(function(e){ switch_view_mode('thread'); return false });

        mailviewsplit = new rcube_splitter({ id:'mailviewsplitter', p1:'#mailview-top', p2:'#mailview-bottom',
          orientation:'h', relative:true, start:310, min:150, size:6, offset:-18 });
        if (previewframe)
          mailviewsplit.init();

        new rcube_scroller('#folderlist-content', '#folderlist-header', '#folderlist-footer');

        rcmail.addEventListener('setquota', update_quota);
      }

      if ($('#mailview-left').length) {
        new rcube_splitter({ id:'mailviewsplitterv', p1:'#mailview-left', p2:'#mailview-right',
          orientation:'v', relative:true, start:226, min:150, size:12, callback:render_mailboxlist, render:resize_leftcol }).init();
      }
    }
    /***  settings task  ***/
    else if (rcmail.env.task == 'settings') {
      rcmail.addEventListener('init', function(){
        var tab = '#settingstabpreferences';
        if (rcmail.env.action)
          tab = '#settingstab' + (rcmail.env.action.indexOf('identity')>0 ? 'identities' : rcmail.env.action.replace(/\./g, ''));

        $(tab).addClass('selected')
          .children().first().removeAttr('onclick').click(function() { return false; });
      });

      if (rcmail.env.action == 'folders') {
        new rcube_splitter({ id:'folderviewsplitter', p1:'#folderslist', p2:'#folder-details',
          orientation:'v', relative:true, start:266, min:180, size:12 }).init();

        new rcube_scroller('#folderslist-content', '#folderslist-header', '#folderslist-footer');

        rcmail.addEventListener('setquota', update_quota);
      }
      else if (rcmail.env.action == 'identities') {
        new rcube_splitter({ id:'identviewsplitter', p1:'#identitieslist', p2:'#identity-details',
          orientation:'v', relative:true, start:266, min:180, size:12 }).init();
      }
    }
    /***  addressbook task  ***/
    else if (rcmail.env.task == 'addressbook') {
      rcmail.addEventListener('afterupload-photo', show_uploadform);

      if (rcmail.env.action == '') {
        new rcube_splitter({ id:'addressviewsplitterd', p1:'#addressview-left', p2:'#addressview-right',
          orientation:'v', relative:true, start:226, min:150, size:12, render:resize_leftcol }).init();
        new rcube_splitter({ id:'addressviewsplitter', p1:'#addresslist', p2:'#contacts-box',
          orientation:'v', relative:true, start:286, min:270, size:12 }).init();

        new rcube_scroller('#directorylist-content', '#directorylist-header', '#directorylist-footer');
      }
    }

    // turn a group of fieldsets into tabs
    $('.tabbed').each(function(idx, elem){ init_tabs(elem); })

    // decorate select elements
    $('select.decorated').each(function(){
      if (bw.opera) {
        $(this).removeClass('decorated');
        return;
      }

      var select = $(this),
        height = Math.max(select.height(), 24) - 2,
        width = select.width() - 22,
        title = $('option', this).first().text();

      if ($('option:selected', this).val() != '')
        title = $('option:selected', this).text();

      var overlay = $('<a class="menuselector"><span class="handle">' + title + '</span></a>')
        .css('position', 'absolute')
        .offset(select.position())
        .insertAfter(select);

      overlay.children().width(width).height(height).css('line-height', (height - 1) + 'px');

      select.change(function() {
          var val = $('option:selected', this).text();
          $(this).next().children().html(val);
        });

      var parent = select.parent();
      if (parent.css('position') != 'absolute')
        parent.css('position', 'relative');

      // re-set original select width to fix click action and options width in some browsers
      select.width(overlay.width());
    });

    $(document.body)
      .bind('mouseup', body_mouseup)
      .bind('keyup', function(e){
        if (e.keyCode == 27) {
          for (var id in popups) {
            if (popups[id].is(':visible'))
              show_popup(id, false);
          }
        }
      });

    $('iframe').load(function(e){
      // this = iframe
      var doc = this.contentDocument ? this.contentDocument : this.contentWindow ? this.contentWindow.document : null;
      $(doc).mouseup(body_mouseup);
    })
    .contents().mouseup(body_mouseup);

    // don't use $(window).resize() due to some unwanted side-effects
    window.onresize = resize;
    resize();
  }