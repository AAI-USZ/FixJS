function(data) {
    /* Schedule refresh first, in case we crash and burn.
     * Introduce some jitter to spread load a bit. */
    var refresh = Math.round((0.5 + Math.random()) * mutiny.refresh);
    setTimeout('mutiny.load_data('+refresh+');', Math.random() * 100);

    for (idx in data) {
      mutiny.channel_log.push(data[idx]);
      var iid = data[idx][0];
      var info = data[idx][1];
      var tpl = $('#template-'+info.event).html();
      var dom_id = iid;
      var target = 'channel';

      if (info.update) {
        iid = dom_id = info.update;
      }
      if (info.event == 'whois') {
        iid = dom_id = info.uid;
        target = 'people';
        mutiny.avatars[info.uid] = info.avatar;
        tpl = mutiny.render_text(/_INFO_/g, info.userinfo,
                tpl.replace(/_URL_/g, info.url || ''));
      }
      var oi = $('#'+dom_id);
      if (info.event == 'delete') {
        $('#'+info.target).remove();
      }
      else if (tpl) {
        tpl = mutiny.render_time(iid,
                mutiny.render_nick(info.nick || '', info.uid || '',
                  mutiny.render_text(/_UID_/g, info.uid,
                    mutiny.render_text(/_STAT_/g, info.stat,
                      mutiny.render_text(/_TEXT_/g, info.text, tpl)))));
        if (oi.html()) {
          oi.html($(tpl).html());
        } else {
          var td = document.getElementById(target);
          var scroll = (td.scrollHeight - td.scrollTop == mutiny.scroll_diff);
          var jqObj = $(tpl).attr('id', dom_id);
          $('#'+target).append(jqObj);
          if (target == 'channel') {
            mutiny.apply_filters(jqObj);
            if (scroll || !mutiny.scroll_diff) {
              td.scrollTop = td.scrollHeight;
              mutiny.scroll_diff = (td.scrollHeight - td.scrollTop);
            }
          }
        }
      }
      if (iid > mutiny.seen) mutiny.seen = iid;
    }
    mutiny.trim_log();
  }