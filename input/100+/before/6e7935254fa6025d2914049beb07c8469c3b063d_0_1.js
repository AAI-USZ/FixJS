function getNav() {
  var mobileNav = $('nav[role=navigation] fieldset[role=search]').after('<fieldset class="mobile-nav"></fieldset>').next().append('<select></select>');
  mobileNav.children('select').append('<option value="">Navigate&hellip;</option>');
  $('ul[role=main-navigation]').addClass('main-navigation');
  $('ul.main-navigation a').each(function(link) {
    mobileNav.children('select').append('<option value="'+link.href+'">&bull; '+link.text+'</option>');
  });
  mobileNav.children('select').bind('change', function(event) {
    if (event.target.value) { window.location.href = event.target.value; }
  });
}