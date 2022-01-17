function (subs) {
      var html = tmpls.subs_nav({groups: subs});
      $subs_list.empty().append(html).find('img').each(util.favicon_ok);
      $subs_list.trigger('refresh.rm');
      util.call_if_fn(cb);
    }