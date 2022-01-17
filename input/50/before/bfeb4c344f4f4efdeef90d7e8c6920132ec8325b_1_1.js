function(link) {
    mobileNav.children('select').append('<option value="'+link.href+'">&raquo; '+link.text+'</option>');
  }