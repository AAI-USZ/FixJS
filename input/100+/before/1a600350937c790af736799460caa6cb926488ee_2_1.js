function(data) {
    var gov_updates, k, l, num_links, rec, t, tag, u, v, watch_updates, _i, _j, _k, _l, _len, _len2, _len3, _len4, _len5, _m, _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
    loaded_data = data;
    all_books = {};
    all_tags = {};
    all_people = {};
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
      if (((_ref2 = rec.base.responsible_authority) != null ? _ref2.main : void 0) != null) {
        all_people[rec.base.responsible_authority.main] = 1;
      }
      _ref3 = rec.base.timeline;
      for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
        t = _ref3[_k];
        t.israeli_due_date = convert_to_israeli_time(t.due_date);
      }
      all_subjects[rec.base.subject] = 1;
      gov_updates = [];
      watch_updates = [];
      _ref4 = rec.updates;
      for (k in _ref4) {
        v = _ref4[k];
        for (_l = 0, _len4 = v.length; _l < _len4; _l++) {
          u = v[_l];
          u.user = k;
          u.israeli_update_time = convert_to_israeli_time(u.update_time);
          if (k === 'gov') {
            gov_updates.push(u);
          } else {
            watch_updates.push(u);
          }
          if (u.links) {
            _ref5 = u.links;
            for (_m = 0, _len5 = _ref5.length; _m < _len5; _m++) {
              l = _ref5[_m];
              num_links[l.url] = true;
            }
          }
        }
      }
      rec.base.num_links = Object.keys(num_links).length;
      rec.gov_updates = gov_updates;
      rec.watch_updates = watch_updates;
      rec.base.subscribers = (_ref6 = rec.subscribers) != null ? _ref6 : 0;
      if (((_ref7 = rec.base.recommendation) != null ? _ref7.length : void 0) > 400) {
        rec.base.recommendation_shortened = rec.base.recommendation.slice(0, 401) + "&nbsp;" + ("<a class='goto-detail' rel='" + rec.slug + "' href='#'>") + "עוד..." + "</a>";
      } else {
        rec.base.recommendation_shortened = rec.base.recommendation;
      }
    }
    all_tags = Object.keys(all_tags);
    all_people = Object.keys(all_people);
    all_subjects = Object.keys(all_subjects);
    all_books = Object.keys(all_books);
    if (localStorage) {
      try {
        localStorage.data = JSON.stringify(data);
        localStorage.all_books = JSON.stringify(all_books);
        localStorage.all_tags = JSON.stringify(all_tags);
        localStorage.all_people = JSON.stringify(all_people);
        localStorage.all_subjects = JSON.stringify(all_subjects);
      } catch (error) {
        console.log("failed to save to local storage " + error);
      }
    }
    return process_data();
  }