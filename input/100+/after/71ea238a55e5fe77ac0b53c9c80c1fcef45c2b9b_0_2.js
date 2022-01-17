function() {
    var fullhash, hash, key, part, slug, splits, value, _i, _len, _ref;
    fullhash = window.location.hash;
    if (fullhash === "#about" || fullhash === "#partners") {
      $("#container").css('display', 'none');
      $("#backlink").css('display', 'inline');
      $("#summary").html('');
      $("#summary-header").css('visibility', 'hidden');
      $("#orderstats").css('display', 'none');
      $("#searchwidget").css('display', 'none');
      $("#backlink").css('display', 'inline');
      $("#page").css('display', 'inherit');
      $("#page div").css('display', 'none');
      $("#page div" + fullhash).css('display', 'inherit');
      return;
    } else {
      $("#page").css('display', 'none');
      $("#container").css('display', 'inherit');
      $("#searchwidget").css('display', 'inherit');
      $("#orderstats").css('display', 'inherit');
      $("#summary-header").css('visibility', 'inherit');
      $("#backlink").css('display', 'none');
    }
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
  }