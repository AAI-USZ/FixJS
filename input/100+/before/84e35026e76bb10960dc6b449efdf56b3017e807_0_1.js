function (e) {
    var $option = $("option:selected", $(this)),
      $select = $(this),
      targetIdx = $option.attr('value'),
      $target;

    e.preventDefault();
    if ($option.hasClass('active')) {
      return;
    }

    $target = $(this).parents('.tabbable').eq(0).find('.tab-content [data-idx=' + targetIdx + ']');

    activate($option, $select);
    activate($target, $target.parent());

    // Enable all fields in the targeted tab
    $target.find('input, textarea, select').removeAttr('disabled');

    // Disable all fields in other tabs
    $target.parent()
      .children(':not([data-idx=' + targetIdx + '])')
      .find('input, textarea, select')
      .attr('disabled', 'disabled');
  }