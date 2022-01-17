function paneVisibility() {
  var img = document.getElementById(paneVisibility.img_id);
  var pane = document.getElementById(paneVisibility.pane_id);

  if (paneVisibility.visible == true) {
    pane.style.display = 'block';
    img.src = '/images/icons/bullet_toggle_minus.png';
    img.title = 'Hide type list';
  } else {
    pane.style.display = 'none';
    img.src = '/images/icons/bullet_toggle_plus.png';
    img.title = 'Show type list';
  }

  dijit.byId('bc').resize();
}