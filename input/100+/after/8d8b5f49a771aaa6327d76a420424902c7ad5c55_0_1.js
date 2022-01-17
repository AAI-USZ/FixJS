function(clear) {
    var self = this;
    self.each(function (i, element) {
        if ($.inArray(element, elements) == -1)
            elements.push(element);
    });
    $.each(elements, refresh);

    var $s = $t.settings;
    if ($s.refreshMillis > 0) {
      if (intervalId === null) {
        intervalId = setInterval(function() { $.each(elements, refresh); }, $s.refreshMillis);
      }
    }
    return self;
  }