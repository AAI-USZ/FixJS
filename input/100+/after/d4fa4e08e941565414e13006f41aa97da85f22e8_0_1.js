function(data) {
    var gov_updates, k, l, num_links, rec, tag, u, v, watch_updates, _i, _j, _k, _l, _len, _len2, _len3, _len4, _ref, _ref2, _ref3, _ref4, _ref5;
    loaded_data = data;
    all_books = {};
    all_tags = {};
    all_subjects = {};
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      rec = data[_i];
      num_links = {};
      if (!all_books[rec.base.book]) all_books[rec.base.book] = {};
      all_books[rec.base.book][rec.base.chapter] = true;
      _ref = rec.base.tags;
      for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
        tag = _ref[_j];
        all_tags[tag] = 1;
      }
      all_subjects[rec.base.subject] = 1;
      gov_updates = [];
      watch_updates = [];
      _ref2 = rec.updates;
      for (k in _ref2) {
        v = _ref2[k];
        for (_k = 0, _len3 = v.length; _k < _len3; _k++) {
          u = v[_k];
          u.user = k;
          if (k === 'gov') {
            gov_updates.push(u);
          } else {
            watch_updates.push(u);
          }
          if (u.links) {
            _ref3 = u.links;
            for (_l = 0, _len4 = _ref3.length; _l < _len4; _l++) {
              l = _ref3[_l];
              num_links[l.url] = true;
            }
          }
        }
      }
      rec.base.num_links = Object.keys(num_links).length;
      rec.gov_updates = gov_updates;
      rec.watch_updates = watch_updates;
      rec.base.subscribers = (_ref4 = rec.subscribers) != null ? _ref4 : 0;
      if (((_ref5 = rec.base.recommendation) != null ? _ref5.length : void 0) > 500) {
        rec.base.recommendation_shortened = rec.base.recommendation.slice(0, 501) + "&nbsp;" + ("<a href='" + (generate_url(rec.slug)) + "'>") + "עוד..." + "</a>";
      } else {
        rec.base.recommendation_shortened = rec.base.recommendation;
      }
    }
    all_tags = Object.keys(all_tags);
    all_subjects = Object.keys(all_subjects);
    all_books = Object.keys(all_books);
    if (localStorage) {
      localStorage.data = JSON.stringify(data);
      localStorage.all_books = JSON.stringify(all_books);
      localStorage.all_tags = JSON.stringify(all_tags);
      localStorage.all_subjects = JSON.stringify(all_subjects);
    }
    return process_data();
  }