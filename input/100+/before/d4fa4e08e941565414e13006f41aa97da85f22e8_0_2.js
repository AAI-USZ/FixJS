function() {
      var NOT_SET, available_height, conflict, conflict_status, el, fixed_at, gov_status, has_unknowns, height, i, implementation_status, is_good_status, item_margins, its_today, last_percent, last_update, last_update_at, late, line, margins, max_numeric_date, min_numeric_date, pad, point, stamp, stamp_class, status, status_to_hebrew, status_to_stamp_class, timeline_items, today, today_at, today_date, top, _i, _j, _ref, _ref2, _ref3, _ref4;
      pad = function(n) {
        if (n < 10) {
          return '0' + n;
        } else {
          return n;
        }
      };
      today = new Date();
      today = "" + (today.getFullYear()) + "/" + (pad(today.getMonth() + 1)) + "/" + (pad(today.getDate() + 1));
      max_numeric_date = 0;
      min_numeric_date = 2100 * 372;
      $(this).find('.timeline .timeline-point.today').attr('data-date', today);
      has_unknowns = false;
      $(this).find(".timeline > ul > li").each(function() {
        var alt, d, date, day, hour, img, min, month, numeric_date, second, t, time, year, _ref, _ref2;
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
        img = $(this).find('img');
        alt = img != null ? img.attr('alt') : void 0;
        if (alt) return img.attr('src', "/profile/" + (slugify(alt)));
      });
      if (has_unknowns) {
        max_numeric_date += 180;
        $(this).find(".timeline > ul > li[data-date-numeric='xxx']").attr('data-date-numeric', max_numeric_date);
      }
      $(this).find(".timeline > ul > li").tsort({
        attr: 'data-date-numeric',
        order: 'desc'
      });
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
      };
      gov_status = 'NEW';
      last_percent = 0.0;
      item_margins = 5;
      margins = 80;
      height = $(this).innerHeight() - margins;
      available_height = height;
      $(this).find(".timeline > ul > li .timeline-point").each(function() {
        return available_height = available_height - $(this).outerHeight() - item_margins;
      });
      top = 0;
      conflict = false;
      conflict_status = null;
      late = false;
      timeline_items = $(this).find(".timeline > ul > li");
      if ((timeline_items.length > 0) && $(timeline_items[0]).find('.timeline-point').hasClass('today')) {
        today_date = parseInt($(timeline_items[0]).attr('data-date-numeric'));
        last_update = parseInt($(this).find(".timeline > ul > li").attr('data-date-numeric'));
        if (today_date - last_update > 180) late = true;
      }
      NOT_SET = 1000;
      last_update_at = NOT_SET;
      today_at = NOT_SET;
      fixed_at = NOT_SET;
      for (i = _i = _ref = timeline_items.size() - 1; _ref <= 0 ? _i <= 0 : _i >= 0; i = _ref <= 0 ? ++_i : --_i) {
        el = $(timeline_items[i]);
        point = el.find('.timeline-point:first');
        line = el.find('.timeline-line:first');
        status = (_ref2 = point.attr('data-status')) != null ? _ref2 : gov_status;
        if (point.hasClass('gov-update')) {
          conflict = false;
          gov_status = status != null ? status : gov_status;
          last_update_at = i;
        }
        if ((fixed_at === NOT_SET) && (gov_status === "FIXED" || gov_status === "IRRELEVANT")) {
          fixed_at = i;
        }
        its_today = false;
        if (point.hasClass("today")) {
          today_at = i;
          its_today = true;
        }
        if (point.hasClass('watch-update')) {
          if (is_good_status(gov_status) !== is_good_status(status)) {
            conflict = true;
            conflict_status = status;
          }
          if (is_good_status(status)) {
            point.addClass("watch-status-good");
          } else {
            point.addClass("watch-status-bad");
          }
          last_update_at = i;
        }
        if (today_at === NOT_SET || its_today) {
          point.find('.implementation-status').addClass("label-" + status);
          point.find('.implementation-status').html(status_to_hebrew(status));
          line.addClass("status-" + gov_status);
          point.addClass("gov-" + gov_status);
          if (conflict) point.addClass("conflict");
          if (point.hasClass('gov-update')) {
            if (is_good_status(gov_status)) {
              point.addClass("gov-status-good");
            } else {
              point.addClass("gov-status-bad");
            }
          }
        }
      }
      for (i = _j = _ref3 = timeline_items.size() - 1; _ref3 <= 0 ? _j <= 0 : _j >= 0; i = _ref3 <= 0 ? ++_j : --_j) {
        el = $(timeline_items[i]);
        line = el.find('.timeline-line:first');
        if ((fixed_at !== NOT_SET && i <= fixed_at) || i <= today_at) {
          line.addClass("future");
        } else {
          line.addClass("past");
          if (i <= last_update_at) line.addClass("unreported");
        }
      }
      $(this).find(".timeline > ul > li").each(function() {
        var date, item_height, percent, point_size;
        point = $(this).find('.timeline-point:first');
        line = $(this).find('.timeline-line:first');
        date = parseInt($(this).attr('data-date-numeric'));
        percent = (max_numeric_date - date) / (max_numeric_date - min_numeric_date);
        point_size = point.outerHeight() + item_margins;
        item_height = available_height * (percent - last_percent) + point_size;
        $(this).css('height', item_height);
        $(this).css('top', top);
        last_percent = percent;
        return top = top + item_height;
      });
      $(this).find(".timeline > ul > li:first > .timeline-line").remove();
      $(this).find(".timeline > ul > li:first").css('height', '3px');
      implementation_status = (_ref4 = $(this).find('.gov-update:last').attr('data-status')) != null ? _ref4 : "NEW";
      if (conflict) {
        $(this).find('.buxa-header').addClass('conflict');
      } else {
        $(this).find('.buxa-header').removeClass('conflict');
        if (is_good_status(implementation_status)) {
          $(this).find('.buxa-header').addClass('good');
        } else {
          $(this).find('.buxa-header').addClass('bad');
        }
      }
      $(this).attr('data-implementation-status', implementation_status);
      $(this).addClass("implementation-status-" + implementation_status);
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
      $(this).find('.buxa-header').before("<div class='stamp " + stamp_class + "'></div>");
      if (conflict) {
        stamp = status_to_hebrew(conflict_status);
        stamp_class = status_to_stamp_class(conflict_status);
        return $(this).find('.buxa-header').before("<div class='stamp conflicting " + stamp_class + "'></div>");
      }
    }