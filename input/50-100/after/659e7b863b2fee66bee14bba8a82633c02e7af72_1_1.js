function _reset(id, slug, name, category, title_color, title_subs) {
    var cat = category.replace(/ /g, "_").toLowerCase(),
    $ul = $(".legend ul." + cat);

    $ul.find("li").remove();

    _add(id, slug, name, category, title_color, title_subs);

  }