function(err, doc) {
      // ToDo hb users check
      var post_count = doc.cache.real.post_count;

      var thread = {
        forum_id:   doc.forum_id,
        seo_desc:   doc.cache.real.seo_desc,
        id:         thread_id,
        title:      doc.title,
        post_count: post_count
      };
      callback(err, thread);
    }