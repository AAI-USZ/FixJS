function() {

  var menuitem = document.querySelector("span.new-wrapper i.nav-me") || null,

      avi = document.querySelector('img.avatar.size32') || null,

      src = avi ? avi.src : "";



  if (menuitem && src) {

    menuitem.style.cssText = "background-image: url('" + src + "') !important;background-position: 0 0;border-radius: 4px;height: 32px;margin: -10px 0 0;width: 32px;";

  }

}