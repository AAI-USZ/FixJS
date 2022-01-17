function() {
    var ignoredTags, selectors;
    ignoredTags = ['.navbar.navbar-fixed-top', '#blueBar.fixed_elem', '#onegoogbar', '#gb', '#mngb', '.topbar .global-nav', '#navBar.fixed'];
    selectors = ignoredTags.join(', ');
    if ($(selectors).length > 0) {
      return true;
    } else {
      return false;
    }
  }