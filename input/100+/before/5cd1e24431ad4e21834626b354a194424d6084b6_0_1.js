function(){
  $(window).scrollTop(0);
  //load map-section in dashboard by default on page load for authenticated user
  if(($("#sidenav").length > 0) && (!window.location.hash)) {
    var test = window.location.hash;
    window.location.hash = "#map-section";
    $(window).scrollTop(0);
    // permalink for dashboard tabs for authenticated user
  } else {
    var match = window.location.hash;
    $('#sidenav a[href="' + match + '"]').tab('show');
    $(window).scrollTop(1);
  };
  //use browser forward/back buttons to navigate dashboard tabs
  $(window).bind('hashchange', function(){
    var active_tab = window.location.hash;
    $(window).scrollTop(0);
    $('#sidenav a[href="' + active_tab + '"]').tab('show');
  });
}