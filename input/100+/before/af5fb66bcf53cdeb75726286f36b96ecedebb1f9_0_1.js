function showUncheckedState(element) {
      element.parent().prev().css("color",settings.off_label_color);
      element.parent().next().css("color",settings.on_label_color);
      element.parent().css("background-color", settings.off_bg_color).removeClass('on');
      element.parent().parent().prev().removeAttr("checked").trigger('change');
      element.removeClass("left").addClass("right");
    }