function showCheckedState(element) {
      element.parent().prev().css("color",settings.on_label_color);
      element.parent().next().css("color",settings.off_label_color);
      element.parent().css("background-color", settings.on_bg_color).addClass('on');
      element.parent().parent().prev().attr("checked", "checked").trigger('change');
      element.removeClass("right").addClass("left");
    }