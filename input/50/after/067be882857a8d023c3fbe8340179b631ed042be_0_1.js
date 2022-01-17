function() {
    var offset = $(this).offset();
    $("#screenlet-content-search").css("display", "block");
    $("#screenlet-content-search").offset({'top':offset.top});
  }