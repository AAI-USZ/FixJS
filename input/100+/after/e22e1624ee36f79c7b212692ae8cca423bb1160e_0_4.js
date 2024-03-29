function() {
  var BOOK, SEARCHTERM, SLUG, all_books, all_people, all_subjects, all_tags, convert_to_israeli_time, data_callback, date_to_hebrew, do_search, generate_hash, generate_url, go_to_comments, iced, initialized, is_good_status, load_data, load_fb_comment_count, loaded_data, onhashchange, pad, process_data, run_templates, search_term, select_item, selected_book, selected_slug, set_title, setup_detailed_links, setup_searchbox, setup_subscription_form, setup_subscriptions, setup_summary, setup_tags, setup_timeline, setup_tooltips, show_watermark, skip_overview, slugify, status_filter, status_to_hebrew, status_tooltip_to_hebrew, unslugify, update_history, wm_shown, __iced_k,
    __slice = [].slice;

  iced = {
    Deferrals: (function() {

      function _Class(_arg) {
        this.continuation = _arg;
        this.count = 1;
        this.ret = null;
      }

      _Class.prototype._fulfill = function() {
        if (!--this.count) return this.continuation(this.ret);
      };

      _Class.prototype.defer = function(defer_params) {
        var _this = this;
        ++this.count;
        return function() {
          var inner_params, _ref;
          inner_params = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          if (defer_params != null) {
            if ((_ref = defer_params.assign_fn) != null) {
              _ref.apply(null, inner_params);
            }
          }
          return _this._fulfill();
        };
      };

      return _Class;

    })(),
    findDeferral: function() {
      return null;
    }
  };
  __iced_k = function() {};

  loaded_data = null;

  all_books = [];

  all_tags = [];

  all_people = [];

  all_subjects = [];

  selected_book = "";

  search_term = "";

  selected_slug = "";

  skip_overview = false;

  BOOK = 'b';

  SLUG = 's';

  SEARCHTERM = 't';

  status_filter = null;

  go_to_comments = false;

  slugify = function(str) {
    var ch, co, str2, x, _i, _ref;
    str2 = "";
    if (str === "") return "";
    for (x = _i = 0, _ref = str.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; x = 0 <= _ref ? ++_i : --_i) {
      ch = str.charAt(x);
      co = str.charCodeAt(x);
      if (co >= 0x5d0 && co < 0x600) co = co - 0x550;
      if (co < 256) str2 += (co + 0x100).toString(16).substr(-2).toUpperCase();
    }
    return str2;
  };

  unslugify = function(str) {
    var ch, str2, x, _i, _ref;
    str2 = "";
    if (str === "") return "";
    for (x = _i = 0, _ref = (str.length / 2) - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; x = 0 <= _ref ? ++_i : --_i) {
      ch = str.slice(x * 2, (x * 2 + 1) + 1 || 9e9);
      ch = parseInt(ch, 16);
      if (ch >= 128) ch += 0x550;
      str2 = str2 + String.fromCharCode(ch);
    }
    return str2;
  };

  generate_hash = function(selected_book, search_term, slug) {
    if (slug) {
      return "!z=" + BOOK + ":" + (slugify(selected_book)) + "_" + SLUG + ":" + slug;
    } else {
      return "!z=" + BOOK + ":" + (slugify(selected_book)) + "_" + SEARCHTERM + ":" + (slugify(search_term));
    }
  };

  generate_url = function(slug) {
    return "http://" + window.location.host + "/#" + (generate_hash(selected_book, "", slug));
  };

  update_history = function(slug) {
    var ___iced_passed_deferral, __iced_deferrals,
      _this = this;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    (function(__iced_k) {
      __iced_deferrals = new iced.Deferrals(__iced_k, {
        parent: ___iced_passed_deferral,
        filename: 'gov-watch.iced',
        funcname: 'update_history'
      });
      setTimeout((__iced_deferrals.defer({
        assign_fn: (function() {
          return function() {
            return __iced_deferrals.ret = arguments[0];
          };
        })(),
        lineno: 58
      })), 0);
      __iced_deferrals._fulfill();
    })(function() {
      return window.location.hash = generate_hash(selected_book, search_term, slug);
    });
  };

  set_title = function(title) {
    return $("title").html(title);
  };

  onhashchange = function() {
    var fullhash, hash, key, part, slug, splits, value, _i, _len, _ref;
    fullhash = window.location.hash;
    hash = fullhash.slice(4, fullhash.length);
    splits = hash.split("_");
    slug = null;
    selected_book = null;
    search_term = "";
    for (_i = 0, _len = splits.length; _i < _len; _i++) {
      part = splits[_i];
      _ref = part.split(":"), key = _ref[0], value = _ref[1];
      if (key === BOOK) selected_book = unslugify(value);
      if (key === SLUG) slug = value;
      if (key === SEARCHTERM) search_term = unslugify(value);
    }
    if (!selected_book && !slug) {
      selected_book = all_books[0];
      update_history();
      return;
    }
    $("#books li.book").toggleClass('active', false);
    $("#books li.book[data-book='" + selected_book + "']").toggleClass('active', true);
    if (search_term !== "") {
      show_watermark(false);
      $("#searchbox").val(search_term);
    }
    if (slug) {
      selected_slug = slug;
      select_item(selected_slug);
      $(".item").removeClass("shown");
      $("#items").isotope({
        filter: ".shown"
      });
    } else {
      set_title('דו"ח טרכטנברג | המפקח: מעקב אחר ישום המלצות הועדה');
      selected_slug = null;
      select_item(null);
      do_search();
    }
    return _gaq.push(['_trackPageview', '/'+fullhash]);;
  };

  wm_shown = false;

  show_watermark = function(show) {
    if (show) {
      $("#searchbox").val("סינון חופשי של ההמלצות");
    } else {
      if (wm_shown) $("#searchbox").val("");
    }
    wm_shown = show;
    return $("#searchbox").toggleClass('watermark', show);
  };

  convert_to_israeli_time = function(reversed_time) {
    var date, time;
    if (!reversed_time) return reversed_time;
    reversed_time = reversed_time.split(" ");
    if (reversed_time.length > 1) {
      date = reversed_time[0], time = reversed_time[1];
    } else {
      date = reversed_time[0];
      time = null;
    }
    date = date.split('/');
    date = "" + date[2] + "/" + date[1] + "/" + date[0];
    if (time) {
      return "" + date + " " + time;
    } else {
      return date;
    }
  };

  data_callback = function(data) {
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
      localStorage.data = JSON.stringify(data);
      localStorage.all_books = JSON.stringify(all_books);
      localStorage.all_tags = JSON.stringify(all_tags);
      localStorage.all_people = JSON.stringify(all_people);
      localStorage.all_subjects = JSON.stringify(all_subjects);
    }
    return process_data();
  };

  initialized = false;

  setup_searchbox = function() {
    var person, source, subject, tag, _i, _j, _k, _len, _len2, _len3;
    show_watermark(true);
    $("#searchbox").change(function() {
      if (wm_shown) {
        search_term = "";
      } else {
        search_term = $("#searchbox").val();
      }
      return update_history();
    });
    $("#searchbox").focus(function() {
      return show_watermark(false);
    });
    $("#searchbox").blur(function() {
      if ($(this).val() === "") return show_watermark(true);
    });
    $("#searchbar").submit(function() {
      return false;
    });
    source = [];
    for (_i = 0, _len = all_tags.length; _i < _len; _i++) {
      tag = all_tags[_i];
      source.push({
        type: "tag",
        title: tag
      });
    }
    for (_j = 0, _len2 = all_people.length; _j < _len2; _j++) {
      person = all_people[_j];
      source.push({
        type: "person",
        title: person
      });
    }
    for (_k = 0, _len3 = all_subjects.length; _k < _len3; _k++) {
      subject = all_subjects[_k];
      source.push({
        type: "subject",
        title: subject
      });
    }
    $("#searchbox").typeahead({
      source: source,
      items: 20,
      matcher: function(item) {
        return ~item.title.indexOf(this.query);
      },
      valueof: function(item) {
        return item.title;
      },
      itemfrom: function(query) {
        return {
          type: "subject",
          title: query
        };
      },
      selected: function(val) {
        search_term = val;
        return update_history();
      },
      highlighter: function(item) {
        var highlighted_title;
        highlighted_title = item.title.replace(new RegExp('(' + this.query + ')', 'ig'), function($1, match) {
          return '<strong>' + match + '</strong>';
        });
        if (item.type === "subject") {
          return highlighted_title;
        } else if (item.type === "tag") {
          return "<span class='searchtag'><span>" + highlighted_title + "</span></span>";
        } else if (item.type === "person") {
          return "<span class='persontag'><span>" + highlighted_title + "</span></span>";
        } else {
          return console.log(item.type + " " + item.title);
        }
      }
    });
    return $("#clearsearch").click(function() {
      search_term = "";
      show_watermark(true);
      update_history();
      return false;
    });
  };

  run_templates = function(template, data, selector) {
    var html;
    template = $("script[name=" + template + "]").html();
    html = Mustache.to_html(template, data);
    return $(selector).html(html);
  };

  date_to_hebrew = function(date) {
    var d, day, month, month_to_hebrew, year, _ref;
    date = date.split('/');
    _ref = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = date.length; _i < _len; _i++) {
        d = date[_i];
        _results.push(parseInt(d, 10));
      }
      return _results;
    })(), year = _ref[0], month = _ref[1], day = _ref[2];
    month_to_hebrew = function(month) {
      switch (month) {
        case 1:
          return "ינואר";
        case 2:
          return "פברואר";
        case 3:
          return "מרץ";
        case 4:
          return "אפריל";
        case 5:
          return "מאי";
        case 6:
          return "יוני";
        case 7:
          return "יולי";
        case 8:
          return "אוגוסט";
        case 9:
          return "ספטמבר";
        case 10:
          return "אוקטובר";
        case 11:
          return "נובמבר";
        case 12:
          return "דצמבר";
      }
    };
    return "" + (month_to_hebrew(month)) + " " + year;
  };

  pad = function(n) {
    if (n < 10) {
      return '0' + n;
    } else {
      return n;
    }
  };

  status_to_hebrew = function(status) {
    switch (status) {
      case "NEW":
        return "טרם התחיל";
      case "STUCK":
        return "תקוע";
      case "IN_PROGRESS":
        return "בתהליך";
      case "FIXED":
        return "יושם במלואו";
      case "WORKAROUND":
        return "יושם חלקית";
      case "IRRELEVANT":
        return "יישום ההמלצה כבר לא נדרש";
    }
    return "";
  };

  status_tooltip_to_hebrew = function(status) {
    switch (status) {
      case "NEW":
        return "הממשלה החליטה שלא לטפל בהמלצה זו";
      case "STUCK":
        return "ההמלצה בטיפול, אבל יש גורמים חיצוניים שמעכבים אותה";
      case "IN_PROGRESS":
        return "ההמלצה נמצאת בטיפול. הסיבות לכך הן לרוב: חקיקה בכנסת, ועדות הדנות בנושא, או שההמלצה היא חלק מתוכנית חומש";
      case "FIXED":
        return "מדד התפוקה יושם: הצעדים שהממשלה הייתה צריכה לעשות בוצעו";
      case "WORKAROUND":
        return "";
      case "IRRELEVANT":
        return "";
    }
    return "";
  };

  is_good_status = function(status) {
    switch (status) {
      case "NEW":
        return false;
      case "STUCK":
        return false;
      case "IN_PROGRESS":
        return true;
      case "FIXED":
        return true;
      case "WORKAROUND":
        return false;
      case "IRRELEVANT":
        return true;
    }
    return null;
  };

  setup_timeline = function(item_selector, margins) {
    if (margins == null) margins = 80;
    return $(item_selector).each(function() {
      var NOT_SET, available_size, buxa_header, common_margin, conflict, conflict_status, date_bar, el, finish_date, first_margin, fixed_at, gov_status, has_unknowns, horizontal, i, implementation_status, initial_year, item_margins, its_today, last_percent, last_update, last_update_at, last_year, late, line, margin, max_numeric_date, min_numeric_date, pixel_years, point, size, slug, stamp, stamp_class, stamp_tooltip, status, status_to_stamp_class, timeline_items, today, today_at, today_date, y, _i, _j, _k, _ref, _ref2, _ref3;
      horizontal = $(this).find('.timeline-logic.horizontal').size() > 0;
      slug = $(this).attr('rel');
      today = new Date();
      today = "" + (today.getFullYear()) + "/" + (pad(today.getMonth() + 1)) + "/" + (pad(today.getDate() + 1));
      max_numeric_date = 0;
      min_numeric_date = 2100 * 372;
      $(this).find('.timeline-logic .timeline-point.today').attr('data-date', today);
      has_unknowns = false;
      $(this).find(".timeline-logic > ul > li").each(function() {
        var d, date, day, hour, min, month, numeric_date, second, t, time, year, _ref, _ref2;
        date = $(this).find('.timeline-point:first').attr('data-date');
        date = date.split(' ');
        if (date.length > 1) {
          time = date[1];
        } else {
          time = "00:00:00";
        }
        date = date[0].split('/');
        time = time.split(':');
        _ref = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = date.length; _i < _len; _i++) {
            d = date[_i];
            _results.push(parseInt(d, 10));
          }
          return _results;
        })(), year = _ref[0], month = _ref[1], day = _ref[2];
        _ref2 = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = time.length; _i < _len; _i++) {
            t = time[_i];
            _results.push(parseInt(t, 10));
          }
          return _results;
        })(), hour = _ref2[0], min = _ref2[1], second = _ref2[2];
        numeric_date = (year * 372) + ((month - 1) * 31) + (day - 1) + hour / 24.0 + min / (24.0 * 60) + second / (24 * 60 * 60.0);
        if (isNaN(numeric_date) || (year === 1970)) {
          numeric_date = "xxx";
          has_unknowns = true;
        } else {
          if (numeric_date > max_numeric_date) max_numeric_date = numeric_date;
          if (numeric_date < min_numeric_date) min_numeric_date = numeric_date - 1;
        }
        $(this).attr('data-date-numeric', numeric_date);
        return $(this).find('.timeline-point').attr('data-date-numeric', numeric_date);
      });
      if (has_unknowns) {
        max_numeric_date += 180;
        $(this).find(".timeline-logic > ul > li[data-date-numeric='xxx']").attr('data-date-numeric', max_numeric_date);
        $(this).find(".timeline-logic > ul > li[data-date-numeric='xxx']").find('.timeline-point').attr('data-date-numeric', max_numeric_date);
      }
      $(this).find('img').each(function() {
        var alt;
        alt = $(this).attr('alt');
        if (alt) return $(this).attr('src', "/profile/" + (slugify(alt)));
      });
      $(this).find(".update-feed > ul > li").tsort({
        attr: 'data-date',
        order: 'desc'
      });
      $(this).find(".timeline-logic > ul > li").tsort({
        attr: 'data-date-numeric',
        order: 'desc'
      });
      finish_date = $(this).find(".timeline-logic > ul > li > .milestone:first").attr('data-date');
      finish_date = date_to_hebrew(finish_date);
      $(this).find(".duedate > p").html(finish_date);
      date_bar = $(this).find(".date-bar");
      if (date_bar) {
        date_bar.html('');
        initial_year = (Math.ceil(min_numeric_date / 372.0)).toFixed(0);
        last_year = (Math.floor(max_numeric_date / 372.0)).toFixed(0);
        for (y = _i = initial_year; initial_year <= last_year ? _i <= last_year : _i >= last_year; y = initial_year <= last_year ? ++_i : --_i) {
          date_bar.prepend("<li>" + y + "</li>");
        }
        pixel_years = ($(this).innerHeight() - margins) / ((max_numeric_date - min_numeric_date) / 372);
        common_margin = pixel_years - date_bar.find('li:first').outerHeight();
        first_margin = (1 - (min_numeric_date % 372) / 372) * pixel_years;
        date_bar.find("li").css("margin-bottom", common_margin);
        date_bar.find("li:last").css("margin-bottom", first_margin + 30);
      }
      last_percent = 0.0;
      item_margins = 5;
      if (horizontal) {
        size = $(this).innerWidth() - margins;
      } else {
        size = $(this).innerHeight() - margins;
      }
      available_size = size;
      $(this).find(".timeline-logic > ul > li .timeline-point").each(function() {
        if (horizontal) {
          return available_size = available_size - $(this).outerWidth() - item_margins;
        } else {
          return available_size = available_size - $(this).outerHeight() - item_margins;
        }
      });
      margin = 0;
      gov_status = 'NEW';
      conflict = false;
      conflict_status = null;
      late = false;
      timeline_items = $(this).find(".timeline-logic > ul > li");
      today_date = parseInt($(this).find(".timeline-logic > ul > li .today").attr('data-date-numeric'));
      last_update = $(this).find(".timeline-logic > ul > li .gov-update:first").attr('data-date-numeric');
      if (last_update) {
        last_update = parseInt(last_update);
      } else {
        last_update = min_numeric_date;
      }
      if (last_update && today_date) {
        if (today_date - last_update > 180) late = true;
      }
      NOT_SET = 1000;
      last_update_at = NOT_SET;
      today_at = NOT_SET;
      fixed_at = NOT_SET;
      for (i = _j = _ref = timeline_items.size() - 1; _ref <= 0 ? _j <= 0 : _j >= 0; i = _ref <= 0 ? ++_j : --_j) {
        el = $(timeline_items[i]);
        point = el.find('.timeline-point:first');
        line = el.find('.timeline-line:first');
        status = (_ref2 = point.attr('data-status')) != null ? _ref2 : gov_status;
        if (point.hasClass('gov-update')) {
          conflict_status = null;
          gov_status = status != null ? status : gov_status;
          last_update_at = i;
          if ((fixed_at === NOT_SET) && (gov_status === "FIXED" || gov_status === "IRRELEVANT")) {
            fixed_at = i;
          }
          point.addClass("gov-" + gov_status);
          if (is_good_status(gov_status)) {
            point.addClass("gov-status-good");
          } else {
            point.addClass("gov-status-bad");
          }
        }
        its_today = false;
        if (point.hasClass("today")) {
          today_at = i;
          its_today = true;
        }
        if (point.hasClass('watch-update')) {
          if (is_good_status(status) !== null) {
            conflict_status = status;
            point.addClass("watch-" + status);
            if (is_good_status(status)) {
              point.addClass("watch-status-good");
            } else {
              point.addClass("watch-status-bad");
            }
          } else {
            point.addClass("no-review");
            point.removeClass("update");
          }
          last_update_at = i;
        }
        if (today_at === NOT_SET || its_today) {
          el.find('.implementation-status').addClass("label-" + status);
          el.find('.implementation-status').html(status_to_hebrew(status));
          line.addClass("status-" + gov_status);
        }
      }
      for (i = _k = _ref3 = timeline_items.size() - 1; _ref3 <= 0 ? _k <= 0 : _k >= 0; i = _ref3 <= 0 ? ++_k : --_k) {
        el = $(timeline_items[i]);
        line = el.find('.timeline-line:first');
        if (i <= today_at) {
          line.addClass("future");
        } else {
          line.addClass("past");
          if (i <= last_update_at) line.addClass("unreported");
        }
      }
      $(this).find(".timeline-logic > ul > li").each(function() {
        var date, item_size, percent, point_size;
        point = $(this).find('.timeline-point:first');
        line = $(this).find('.timeline-line:first');
        date = parseInt($(this).attr('data-date-numeric'));
        percent = (max_numeric_date - date) / (max_numeric_date - min_numeric_date);
        if (horizontal) {
          point_size = point.outerWidth() + item_margins;
        } else {
          point_size = point.outerHeight() + item_margins;
        }
        item_size = available_size * (percent - last_percent) + point_size;
        if (horizontal) {
          $(this).css('width', item_size);
          $(this).css('left', margin);
        } else {
          $(this).css('height', item_size);
          $(this).css('top', margin);
        }
        last_percent = percent;
        return margin = margin + item_size;
      });
      $(this).find(".timeline-logic > ul > li:first > .timeline-line").remove();
      implementation_status = gov_status;
      if (implementation_status !== "FIXED" && implementation_status !== "IRRELEVANT" && implementation_status !== "NEW") {
        if (late) implementation_status = "STUCK";
      } else {
        late = false;
      }
      if (conflict_status) {
        if (is_good_status(implementation_status) !== is_good_status(conflict_status)) {
          conflict = true;
        }
      }
      buxa_header = $(this).find('.buxa-header');
      if (conflict) {
        buxa_header.addClass('conflict');
      } else {
        buxa_header.removeClass('conflict');
        if (is_good_status(implementation_status)) {
          buxa_header.addClass('good');
        } else {
          buxa_header.addClass('bad');
        }
      }
      if (conflict) {
        $(this).attr('data-implementation-status', "CONFLICT");
        $(this).addClass("implementation-status-CONFLICT");
      } else {
        $(this).attr('data-implementation-status', implementation_status);
        $(this).addClass("implementation-status-" + implementation_status);
      }
      if (is_good_status(implementation_status)) {
        $(this).addClass("implementation-status-good");
      } else {
        $(this).addClass("implementation-status-bad");
      }
      status_to_stamp_class = function(status) {
        switch (status) {
          case "NEW":
            return "notstarted";
          case "STUCK":
            return "stuck";
          case "IN_PROGRESS":
            return "inprogress";
          case "FIXED":
            return "done";
          case "WORKAROUND":
            return "workaround";
          case "IRRELEVANT":
            return "done";
        }
      };
      stamp_class = status_to_stamp_class(implementation_status);
      if (late) stamp_class = 'late';
      stamp_tooltip = status_tooltip_to_hebrew(implementation_status);
      buxa_header.before("<div class='stamp " + stamp_class + "' title='" + stamp_tooltip + "'></div>");
      if (conflict) {
        stamp = status_to_hebrew(conflict_status);
        stamp_class = status_to_stamp_class(conflict_status);
        stamp_tooltip = status_tooltip_to_hebrew(conflict_status);
        return buxa_header.before("<div class='stamp conflicting " + stamp_class + "'  title='" + stamp_tooltip + "'></div>");
      }
    });
  };

  setup_summary = function() {
    var conflict, data, fixed, implemented, in_progress, irrelevant, news, stuck, total, workaround;
    total = $(".item.shown").size();
    stuck = $(".item.shown[data-implementation-status='STUCK']").size();
    news = $(".item.shown[data-implementation-status='NEW']").size();
    in_progress = $(".item.shown[data-implementation-status='IN_PROGRESS']").size();
    fixed = $(".item.shown[data-implementation-status='FIXED']").size();
    workaround = $(".item.shown[data-implementation-status='WORKAROUND']").size();
    irrelevant = $(".item.shown[data-implementation-status='IRRELEVANT']").size();
    conflict = $(".item.shown[data-implementation-status='CONFLICT']").size();
    data = {};
    if (total) data.total = total;
    stuck = news + workaround + stuck;
    if (stuck) data.stuck = stuck;
    implemented = fixed + irrelevant;
    if (implemented) data.implemented = implemented;
    if (in_progress) data.in_progress = in_progress;
    if (conflict) data.conflict = conflict;
    run_templates("summary", data, "#summary");
    $("#summary .total").click(function() {
      status_filter = null;
      do_search();
      return false;
    });
    $("#summary .stuck").click(function() {
      status_filter = ['STUCK', 'NEW', 'WORKAROUND'];
      do_search();
      return false;
    });
    $("#summary .implemented").click(function() {
      status_filter = ['FIXED', 'IRRELEVANT'];
      do_search();
      return false;
    });
    $("#summary .in_progress").click(function() {
      status_filter = ['IN_PROGRESS'];
      do_search();
      return false;
    });
    return $("#summary .conflict").click(function() {
      status_filter = ['CONFLICT'];
      do_search();
      return false;
    });
  };

  setup_subscription_form = function() {
    $("#subscribe").modal({
      'show': false
    });
    $("#do_subscribe").click(function() {
      $("#subscribe_form").submit();
      return false;
    });
    return $("#subscribe_form").submit(function() {
      var _this = this;
      $.post($(this).attr('action'), {
        'email': $("#subscribe_email").val()
      }, function(data) {
        var rel;
        $("#subscribe").modal('hide');
        rel = $(_this).attr("rel");
        return $(".watch[rel='" + rel + "']").html(data);
      }, "json");
      return false;
    });
  };

  setup_subscriptions = function(selector) {
    return $("" + selector + " .watch").click(function() {
      var rel;
      rel = $(this).attr('rel');
      $("#subscribe_email").attr('data-slug', rel);
      $("#subscribe_form").attr('action', "/subscribe/" + rel);
      $("#subscribe_form").attr('rel', rel);
      $("#subscribe").modal('show');
      return false;
    });
  };

  setup_tags = function(selector) {
    return $(selector).click(function() {
      search_term = $(this).text();
      show_watermark(false);
      $("#searchbox").val(search_term);
      $("#explanation").modal('hide');
      update_history();
      return false;
    });
  };

  setup_detailed_links = function() {
    return $(".item .goto-detail").click(function() {
      var p, rel, _i, _len, _ref;
      if ($(this).hasClass("commentcount")) go_to_comments = true;
      rel = $(this).attr('rel');
      if (!rel) {
        _ref = $(this).parents();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          rel = $(p).attr('rel');
          if (rel) break;
        }
      }
      update_history(rel);
      return false;
    });
  };

  setup_tooltips = function(selector) {
    return $("" + selector + " .rel-tooltip").tooltip({
      placement: 'bottom'
    });
  };

  process_data = function() {
    var book, explanation_needed, ___iced_passed_deferral, __iced_deferrals, _i, _len,
      _this = this;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    if (initialized) return;
    initialized = true;
    for (_i = 0, _len = all_books.length; _i < _len; _i++) {
      book = all_books[_i];
      $("#books").prepend("<li data-book='" + book + "' class='book'><a href='#'>" + book + "</a></li>");
    }
    run_templates("item", {
      items: loaded_data
    }, "#items");
    explanation_needed = true;
    if ((typeof localStorage !== "undefined" && localStorage !== null ? localStorage.explained : void 0) != null) {
      explanation_needed = false;
    }
    $("#explanation .close").click(function() {
      if (typeof localStorage !== "undefined" && localStorage !== null) {
        localStorage.explained = true;
      }
      $("#explanation").modal('hide');
      return false;
    });
    $("#show-explanation").click(function() {
      $("#explanation").modal('show');
      return false;
    });
    (function(__iced_k) {
      __iced_deferrals = new iced.Deferrals(__iced_k, {
        parent: ___iced_passed_deferral,
        filename: 'gov-watch.iced',
        funcname: 'process_data'
      });
      setTimeout((__iced_deferrals.defer({
        assign_fn: (function() {
          return function() {
            return __iced_deferrals.ret = arguments[0];
          };
        })(),
        lineno: 724
      })), 50);
      __iced_deferrals._fulfill();
    })(function() {
      $.Isotope.prototype._positionAbs = function(x, y) {
        return {
          right: x,
          top: y
        };
      };
      $("#items").isotope({
        itemSelector: '.isotope-card',
        layoutMode: 'masonry',
        transformsEnabled: false,
        filter: ".shown",
        getSortData: {
          followers: function(e) {
            return -parseInt("0" + e.find('.watch').text());
          },
          original: function(e) {
            return "" + (e.attr('data-chapter')) + "/{e.attr('data-subchapter')}";
          },
          budget: function(e) {
            return -parseInt("0" + e.attr('cost'), 10);
          },
          comments: function(e) {
            var ret;
            ret = -parseInt("0" + e.find('.commentcount').text(), 10);
            return ret;
          }
        }
      });
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: 'gov-watch.iced',
          funcname: 'process_data'
        });
        setTimeout((__iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              return __iced_deferrals.ret = arguments[0];
            };
          })(),
          lineno: 746
        })), 50);
        __iced_deferrals._fulfill();
      })(function() {
        setup_timeline(".item");
        $(".item").css('visibility', 'inherit');
        setup_searchbox();
        setup_subscription_form();
        setup_subscriptions(".item");
        setup_tags(".item .tags > ul > li, a[data-tag='true']");
        setup_detailed_links();
        setup_tooltips(".item");
        $("#books li.book a").click(function() {
          selected_book = $(this).html();
          update_history();
          return false;
        });
        $("#sort button").click(function() {
          var sort_measure;
          $("#sort button").removeClass('active');
          $(this).addClass('active');
          sort_measure = $(this).attr('value');
          $("#items").isotope('updateSortData', $(".isotope-card"));
          $("#items").isotope({
            sortBy: sort_measure
          });
          return false;
        });
        $("#explanation").modal({
          'show': true
        });
        window.onhashchange = onhashchange;
        onhashchange();
        (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: 'gov-watch.iced',
            funcname: 'process_data'
          });
          setTimeout((__iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                return __iced_deferrals.ret = arguments[0];
              };
            })(),
            lineno: 787
          })), 1000);
          __iced_deferrals._fulfill();
        })(function() {
          return load_fb_comment_count(".item");
        });
      });
    });
  };

  select_item = function(slug) {
    var item, scroll_to, url, x, ___iced_passed_deferral, __iced_deferrals, _i, _len,
      _this = this;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    $('fb\\:comments').remove();
    $('fb\\:like').remove();
    if (slug) {
      $("#summary-header").css('visibility', 'hidden');
      $("#summary").html('');
      $("#orderstats").css('display', 'none');
      $("#sort button").addClass('disabled');
      $("#searchwidget").css('display', 'none');
      $("#clearsearch").addClass('disabled');
      $("#clearsearch").attr('disabled', 'disabled');
      for (_i = 0, _len = loaded_data.length; _i < _len; _i++) {
        x = loaded_data[_i];
        if (x.slug === slug) {
          item = run_templates("single-item", x, "#single-item");
          set_title(x.base.book + ": " + x.base.subject);
          url = generate_url(slug);
          $(".detail-view .fb").append("<fb:like href='" + url + "' send='true' width='700' show_faces='true' action='recommend' font='tahoma'></fb:like>");
          $(".detail-view .fb").append("<fb:comments href='" + url + "' num_posts='2' width='700'></fb:comments>");
          if (window.FB) {
            FB.XFBML.parse(item.get(0), function() {});
            window.updateFB = function() {};
          } else {
            window.updateFB = function() {
              return FB.XFBML.parse(item.get(0), function() {});
            };
          }
          break;
        }
      }
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: 'gov-watch.iced',
          funcname: 'select_item'
        });
        setTimeout((__iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              return __iced_deferrals.ret = arguments[0];
            };
          })(),
          lineno: 817
        })), 50);
        __iced_deferrals._fulfill();
      })(function() {
        setup_timeline('.detail-view', 69);
        setup_subscriptions(".detail-view");
        setup_tags(".detail-view .tags > ul > li");
        setup_tooltips(".detail-view");
        load_fb_comment_count(".detail-view");
        $("#single-item .commentcount").click(function() {
          $('html, body').animate({
            scrollTop: $("#single-item .fb").offset().top
          }, 0);
          return false;
        });
        $("#single-item .linkcount").click(function() {
          $('html, body').animate({
            scrollTop: $("#single-item .timeline").offset().top
          }, 0);
          return false;
        });
        if (go_to_comments) {
          scroll_to = $(".fb").offset().top - 300;
        } else {
          scroll_to = 0;
        }
        go_to_comments = false;
        return __iced_k($('html, body').animate({
          scrollTop: scroll_to
        }, 0));
      });
    } else {
      $("#single-item").html('');
      $("#summary-header").css('visibility', 'inherit');
      $("#orderstats").css('display', 'inherit');
      $("#sort button").removeClass('disabled');
      $("#searchwidget").css('display', 'inherit');
      $("#clearsearch").removeClass('disabled');
      return __iced_k($("#clearsearch").attr('disabled', null));
    }
  };

  load_fb_comment_count = function(selector) {
    $("" + selector + " .commentcount").each(function() {
      var h, json, slug, ___iced_passed_deferral, __iced_deferrals,
        _this = this;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      slug = $(this).attr('rel');
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: 'gov-watch.iced'
        });
        $.get('https://api.facebook.com/method/fql.query', {
          query: "SELECT url,commentsbox_count FROM link_stat WHERE url='" + (generate_url(slug)) + "'",
          format: "json"
        }, (__iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              return json = arguments[0];
            };
          })(),
          lineno: 853
        })), "json");
        __iced_deferrals._fulfill();
      })(function() {
        h = $(_this).html();
        try {
          return $(_this).html(json[0].commentsbox_count + h);
        } catch (error) {
          return console.log("Failed tp parse json:", JSON.stringify(json));
        }
      });
    });
    if (selector === ".item") {
      return $("#items").isotope('updateSortData', $(".item"));
    }
  };

  do_search = function() {
    var class_filter, found, re, rec, should_show, slug, st, tag, x, _i, _j, _k, _len, _len2, _len3, _ref, _ref2;
    re = RegExp(search_term, "ig");
    for (_i = 0, _len = loaded_data.length; _i < _len; _i++) {
      rec = loaded_data[_i];
      slug = rec.slug;
      rec = rec.base;
      should_show = search_term === "";
      if (search_term !== "") {
        _ref = [rec["recommendation"], rec["subject"], rec["result_metric"], rec["title"], rec["chapter"], rec["subchapter"], rec["responsible_authority"]["main"], rec["responsible_authority"]["secondary"]];
        for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
          x = _ref[_j];
          if (x) {
            found = x.indexOf(search_term) >= 0;
          } else {
            found = false;
          }
          should_show = should_show || found;
        }
        _ref2 = rec.tags;
        for (_k = 0, _len3 = _ref2.length; _k < _len3; _k++) {
          tag = _ref2[_k];
          if (tag === search_term) should_show = true;
        }
      }
      should_show = should_show && ((selected_book === "") || (rec.book === selected_book)) && (!selected_slug);
      $(".item[rel=" + slug + "]").toggleClass("shown", should_show);
    }
    setup_summary();
    if (status_filter) {
      class_filter = [
        (function() {
          var _l, _len4, _results;
          _results = [];
          for (_l = 0, _len4 = status_filter.length; _l < _len4; _l++) {
            st = status_filter[_l];
            _results.push(".shown.implementation-status-" + st);
          }
          return _results;
        })()
      ];
      class_filter = class_filter.join(",");
    } else {
      class_filter = ".shown";
    }
    class_filter = class_filter + ",.always-shown";
    $("#items").isotope({
      filter: class_filter
    });
    return $("#items").isotope("reLayout");
  };

  load_data = function() {
    return $.get("/api", data_callback, "json");
  };

  $(function() {
    var current_version, version, ___iced_passed_deferral, __iced_deferrals,
      _this = this;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    try {
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: 'gov-watch.iced'
        });
        $.get("/api/version", (__iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              return version = arguments[0];
            };
          })(),
          lineno: 917
        })), "json");
        __iced_deferrals._fulfill();
      })(function() {
        try {
          current_version = localStorage.version;
          localStorage.version = JSON.stringify(version);
          if (current_version && version === JSON.parse(current_version)) {
            loaded_data = JSON.parse(localStorage.data);
            all_books = JSON.parse(localStorage.all_books);
            all_tags = JSON.parse(localStorage.all_tags);
            all_people = JSON.parse(localStorage.all_people);
            all_subjects = JSON.parse(localStorage.all_subjects);
            return process_data();
          } else {
            console.log("wrong version " + current_version + " != " + version);
            return load_data();
          }
        } catch (error) {
          console.log("failed to load data from storage: " + error);
          return load_data();
        }
      });
    } catch (error) {
      return load_data();
    }
  });

}