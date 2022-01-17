function(response) {
      var item = $('#post_' + response.pid);
      if (item.find('div.post_controls a[href^="/reblog"]').length > 0) {
         return;
      }
      var perm = item.find("a.permalink:first");
      var tid = response.pid;
      var klass, before, rblnk, txt,i;

      var lang = $('html').attr('lang');
      var question = "";
      var asker = $(item).find(".post_question_asker").text();
      for (i=0; i<MissingE.getLocale(lang).asked.length; i++) {
         if (i>0) {
            question += " ";
         }
         if (MissingE.getLocale(lang).asked[i] === "U") {
            question += asker;
         }
         else {
            question += MissingE.escapeHTML(MissingE.getLocale(lang).asked[i]);
         }
      }
      question += ": " + $(item).find("div.post_question").text()
                           .replace(/\s+/g,' ').replace(/^\s/,'')
                           .replace(/\s$/,'');
      question = encodeURIComponent(question);

      var reblog_text = MissingE.getLocale(lang).reblog;
      before = $('#post_control_reply_' + tid);
      if (before.length === 0) {
         before = $('#show_notes_link_' + tid);
      }
      if (response.success) {
         rblnk = $('<a />',
                   {title: reblog_text,
                    "class": "reblog_button",
                    href: "/reblog/" + tid + "/" + response.data +
                          "/text?post%5Bone%5D=" +
                          MissingE.escapeHTML(question) + "&MissingEaskName=" +
                          response.name + "&MissingEaskPost=" +
                          encodeURIComponent(perm.attr("href"))});
         if (before.length === 0) {
            rblnk.prependTo(item.find('div.post_controls')).after(' ');
         }
         else {
            rblnk.insertAfter(before).before(' ');
         }
         item.attr('name', response.name);
         rblnk.trigger('MissingEaddReblog');
      }
      else {
         var reblog_err = MissingE.getLocale(lang).error;
         rblnk = $('<a />',
                   {title: reblog_err,
                    href: "#",
                    "class": "post_control MissingE_betterReblogs_retryAsk",
                    click: function() { return false; }});
         if (before.length === 0) {
            rblnk.prependTo(item.find('div.post_controls')).after(' ');
         }
         else {
            rblnk.insertAfter(before).before(' ');
         }
      }
   }