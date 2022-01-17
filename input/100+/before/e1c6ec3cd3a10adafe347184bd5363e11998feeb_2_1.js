function(item_selector, margins) {
    var horizontal;
    if (margins == null) margins = 80;
    horizontal = $(this).find('.timeline-logic.horizontal').size() > 0;
    return item_selector.each(function() {
      var available_size, finish_date, item_margins, last_percent, margin, max_numeric_date, min_numeric_date, size;
      max_numeric_date = parseInt($(this).find('.timeline-logic').attr('data-max-numeric-date'));
      min_numeric_date = parseInt($(this).find('.timeline-logic').attr('data-min-numeric-date'));
      $(this).find('img').each(function() {
        var alt;
        alt = $(this).attr('alt');
        if (alt) return $(this).attr('src', "/profile/" + (slugify(alt)));
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
      $(this).find(".timeline-logic > ul > li").each(function() {
        var date, item_size, line, percent, point, point_size;
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
      return $(this).find(".timeline-logic > ul > li:first > .timeline-line").remove();
    });
  }