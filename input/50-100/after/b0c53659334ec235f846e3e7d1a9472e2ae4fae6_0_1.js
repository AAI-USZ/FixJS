function() {
    var url = document.location.toString();
    if (url.match('#/')) {
      $('.nav-tabs.nav-tabs-auto a[href=#'+url.split('#/')[1]+']').tab('show');
    } else if (url.match('#')) {
      $('.nav-tabs.nav-tabs-auto a[href=#'+url.split('#')[1]+']').tab('show');
    }
  }