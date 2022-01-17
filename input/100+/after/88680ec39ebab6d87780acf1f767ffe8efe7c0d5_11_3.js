function(elevent, e) {

  var strs = [ "AddTagId", "goPageTop", "goPageBottom", "SearchForm" ];

  for ( var t = 0; t < strs.length; t++) {

    var elm = document.getElementById(strs[t]);

    if (elm)

      elm.onclick = eXo.wiki.UIWikiPortlet.cancel;

  }

  if (!e)

    e = window.event;

  e.cancelBubble = true;

  var parent = gj(elevent).closest('div');

  var popup = gj(parent).find('div.UIPopupCategory')[0];

  if (popup.style.display === "none") {

    popup.style.display = "block";

  } else {

    popup.style.display = "none";

  }

}