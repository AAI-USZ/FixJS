function(link) {
    mobileNav.children('select').append('<option value="'+link.href+'">&bull; '+link.text+'</option>');
  }