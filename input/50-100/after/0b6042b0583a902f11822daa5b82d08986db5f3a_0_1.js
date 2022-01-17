function() {
      if (typeof(Drupal.settings.ajax_nodeloader.prev_hash) !== 'undefined' && window.location.hash !== Drupal.settings.ajax_nodeloader.prev_hash) {
        var full_link = window.location.hash == '' ? Drupal.settings.ajax_nodeloader.front_page : window.location.hash.substr(1);
        nodeloader_load(full_link, $('a[href="'+full_link+'"]').attr('rel'));
      }
    }