function() {
    var url = "bus_tracker/get_cta_time";

    var ctaTime = $.ajax({
      type: 'GET',
      url: url,
      async: false
    }).responseText;

    return Date(ctaTime);
  }