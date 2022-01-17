function(response) {
      var before, txt;
      var lang = $('html').attr("lang");
      var reblog_text = MissingE.getLocale(lang).reblog;
      if ($('#post_' + response.pid + ' div.post_controls a[href^="/reblog/"]')
            .length > 0) {
         return;
      }
      if (response.success) {
         var post = $('#post_' + response.pid);
         var redir = location.href;
         before = $('#post_control_reply_' + response.pid);
         if (before.length === 0) {
            before = $('#show_notes_link_' + response.pid);
         }
         if (MissingE.isTumblrURL(redir, ["dashboard"])) {
            redir = "http://www.tumblr.com/dashboard/1000/" +
                     (Number(response.pid)+1);
         }
         redir = redir.replace(/http:\/\/www.tumblr.com/,'')
                     .replace(/\//g,'%2F').replace(/\?/g,'%3F')
                     .replace(/&/g,'%26');

         var nr = $('<a />',
                    {title: reblog_text, "class": "reblog_button",
                     href: "/reblog/" + response.pid + "/" + response.data +
                           "?redirect_to=" + redir});
         if (before.length === 0) {
            nr.prependTo(post.find('div.post_controls')).after(' ');
         }
         else {
            nr.insertAfter(before).before(' ');
         }
         if (!post.hasClass("note")) {
            nr.attr('data-fast-reblog-url',
                    "/fast_reblog/" + response.pid + "/" + response.data);
         }
         nr.trigger('MissingEaddReblog');
      }
      else {
         var reblog_err = MissingE.getLocale(lang).error;
         edit = $('#post_' + response.pid)
            .find('div.post_controls a[href^="/edit"]');
         var nre = $('<a />',
                     {title: reblog_err, href: "#",
                      "class": "post_control MissingE_reblogYourself_retry",
                      click: function() { return false; }});
         if (before.length === 0) {
            nre.prependTo(item.find('div.post_controls')).after(' ');
         }
         else {
            nre.insertAfter(before).before(' ');
         }
      }
   }