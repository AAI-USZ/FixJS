function() {
      var NOT_SET, available_size, buxa_header, conflict, conflict_status, el, finish_date, fixed_at, gov_status, has_unknowns, horizontal, i, implementation_status, initial_year, item_margins, its_today, last_percent, last_update, last_update_at, last_year, late, line, margin, max_numeric_date, min_numeric_date, numeric, point, size, slug, stamp, stamp_class, stamp_tooltip, status, status_to_stamp_class, timeline_items, today, today_at, today_date, y, _i, _j, _k, _ref, _ref2, _ref3;
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
      if (!horizontal) {
        initial_year = (Math.ceil(min_numeric_date / 372.0)).toFixed(0);
        last_year = (Math.floor(max_numeric_date / 372.0)).toFixed(0);
        for (y = _i = initial_year; initial_year <= last_year ? _i <= last_year : _i >= last_year; y = initial_year <= last_year ? ++_i : --_i) {
          numeric = y * 372;
          $(this).find(".timeline-logic > ul").append("                                <li data-date-numeric='" + numeric + "'>                                        <div class='timeline-line'></div>                                        <div class='timeline-point milestone tick' data-date-numeric='" + numeric + "' data-date='" + y + "/01/01'><div>" + y + "</div></div>                                </li>");
        }
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
    }