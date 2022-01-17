function(item) {
      var node = $(item);
      if (item.tagName !== 'LI' ||
          !(node.hasClass('post')) ||
          !(node.hasClass('is_reblog')) ||
          node.hasClass('is_mine') ||
          node.find('.post_controls span.reply_button').length > 0 ||
          node.find('.MissingE_experimental_reply').length > 0) {
         return;
      }
      var lang = $('html').attr('lang');
      var replyTxt = MissingE.getLocale(lang).reply;
      var replyingTxt = MissingE.getLocale(lang).replying;
      var id = node.attr('id').match(/\d*$/)[0];
      var notes = $('#show_notes_link_' + id);
      if (notes.length === 0) {
         return false;
      }
      var key = notes.parent().html()
                     .match(/display_post_notes\(\d+,\s*'(\w+)'/);
      if (!key) {
         return false;
      }
      key = MissingE.escapeHTML(key[1]);
      id = MissingE.escapeHTML(id);
      var expRep = $('<span />',
                     {"class": "MissingE_experimental_reply popover_button reply_button",
                      id: "post_control_reply_" + id,
                      title: MissingE.getLocale(lang).dashTweaksText.reply +
                         " [" + MissingE.getLocale(lang).dashTweaksText.experimental + "]"});
      expRep.attr("label", "[" + MissingE.getLocale(lang).dashTweaksText.reply + "]");
      expRep.append(' ');
      var popover = $('<div />', {"class": "popover popover_gradient popover_post_tools"});
      popover.css('display','none');
      var app = popover;
      var inner = $('<div />', {"class": "popover_inner"});
      app.append(inner);
      app = inner;
      inner = $('<form action="/reply" />')
               .append($('<textarea />', {"name": "reply_text",
                                          "maxlength": "250",
                                          title: "250 max"}))
               .append($('<input />', {"type": "hidden",
                                       "name": "post_id",
                                       val: id}))
               .append($('<input />', {"type": "hidden",
                                       "name": "key",
                                       val: key}));
      app.append(inner);
      app = inner;
      inner = $('<button />', {"class": "chrome blue",
                               text: replyTxt,
                               css: {'width': '100%'}});
      inner.attr('data-label',replyTxt);
      inner.attr('data-label-loading',replyingTxt);
      app.append(inner);
      expRep.append(popover);
      notes.after(expRep);
      var failer = $('<span />',
                     {"class": "MissingE_post_control " +
                               "MissingE_experimental_reply_wait",
                      id: "reply_fail_" + id});
      failer.append($('<span />', {"class": "MissingE_successText"})
                     .append('&nbsp;&#x2714;'));
      failer.append($('<span />',
                        {"class": "MissingE_failText",
                         text: MissingE.getLocale(lang).dashTweaksText.reply})
                     .prepend('&nbsp;').append('&nbsp;'));
      failer.insertAfter(notes);
      notes.after(' ');
      failer.after(' ');
   }