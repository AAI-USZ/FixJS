function(item) {
      var lang = $('html').attr('lang');
      var publishText = MissingE.getLocale(lang).dashTweaksText.publish;
      var queueText = MissingE.getLocale(lang).dashTweaksText.queue;
      var post = $(item);
      if (!post.hasClass('submission')) { return; }
      var id = item.id.match(/\d+$/);
      if (!id) { return; }
      id = id[0];
      var controls = post.find('.post_controls');
      if (controls.find('a[onclick*="queue_post"], ' +
                        'a[onclick*="approve_post"]').length === 0) {
         var addPub = $('<a href="#" onclick="return approve_post(' + id +
                        ');" />');
         addPub.attr('title', publishText);
         addPub.text(publishText);
         var addQueue = $('<a href="#" onclick="return queue_post(' + id +
                          ');" />');
         addQueue.attr('title', queueText);
         addQueue.text(queueText);
         var block = controls.find('a[id^="post_block_"]');
         if (block.length === 1) {
            block.after(addPub);
            block.after(addQueue);
         }
         else {
            controls.prepend(addPub);
            controls.prepend(addQueue);
         }
      }
   }