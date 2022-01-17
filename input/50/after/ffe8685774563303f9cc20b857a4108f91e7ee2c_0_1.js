function (e) {
    $("#hide-timeline").hide();
    $("#timeline-results").animate({height: 'hide'}, 1000, 'easeOutQuad');
    $("#show-timeline").show();
  }