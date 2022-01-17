function ($target, targetIndex) {
    // Enable all fields in the targeted tab
    $target.find('input, textarea, select').removeAttr('disabled');

    // Disable all fields in other tabs
    $target.parent()
      .children(':not([data-idx=' + targetIndex + '])')
      .find('input, textarea, select')
      .attr('disabled', 'disabled');
  }