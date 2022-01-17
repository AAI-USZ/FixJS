function _add(id, name, category, title_color, title_subs) {

    if (category === null || !category) {
      category = 'Protected Areas';
    }

    var
    template = null,
    slug     = name.replace(/ /g, "_").toLowerCase(),
    cat      = category.replace(/ /g, "_").toLowerCase();

    var
    color = null,
    extra = null;

    if (title_color) {

      template = _.template($("#legend-item-single-template").html());

      color = title_color;
      $item = $(template({ color:color, category: cat, id: id, name: name.truncate(32) }));

    } else {

      template = _.template($("#legend-item-double-template").html());

      var subs = eval(title_subs);

      var extraItems = _.map(subs, function(e) {
        return '<div class="icon" style="background-color:' + e.color + ';"></div> <a href="#">' + e.title + '</a>';
      }).join("\n");

      var parts = "<div class='extra'>" + extraItems + "</div>";

      var icons = _.map(subs, function(e) {
        return '<div class="half_icon" style="background-color:' + e.color + ';"></div>';
      }).join("\n");

      $item = $(template({ color:color, parts: parts, icons:icons, category: cat, id: id, name: name.truncate(32) }));

    }

    $item.hide();

    var $ul = null;

    if ( $(".legend").find("ul." + cat).length > 0 ) {

      $ul = $(".legend").find("ul." + cat);
      $ul.append($item);

      $item.fadeIn(250);
      $ul.fadeIn(250);
    } else {
      $ul = $("<ul class='"+cat+"' />");
      $ul.append($item);
      $(".legend").find(".content").append($ul);

      $ul.fadeIn(250);
      $item.fadeIn(250);
    }

    if ( $(".legend").find("li").length >= 1 && showMap === true) {
      Legend.show();
    }
  }