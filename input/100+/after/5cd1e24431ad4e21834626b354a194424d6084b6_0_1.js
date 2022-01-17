function(){
  //load map-section in dashboard by default on page load for authenticated user
  if(($("#sidenav").length > 0) && (!window.location.hash)) {
    window.location.hash = "#map-section";
    // permalink for dashboard tabs for authenticated user
  } else {
    var match = window.location.hash;
    $('#sidenav a[href="' + match + '"]').tab('show');
  };
  //use browser forward/back buttons to navigate dashboard tabs
  $(window).bind('hashchange', function(){
    var active_tab = window.location.hash;
    $('#sidenav a[href="' + active_tab + '"]').tab('show');
    $(window).scrollTop(0);
  });
  $(window).scrollTop(0);
}