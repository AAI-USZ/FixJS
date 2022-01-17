function(err, thread) {
      // ToDo hb users check
      var post_count = thread.cache.real.post_count;
      var thread = {
        forum_id:   thread.forum_id,
        seo_desc:   thread.cache.real.seo_desc,
        id:         thread_id,
        title:      thread.title,
        post_count: post_count
      };
      callback(err, thread);
    }