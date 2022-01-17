function(id) {
  var ticklist = [];
  if (id) {
    if (id.indexOf('EDITPAGE') == 0) {
      var membership = id.substring(8);
      ticklist = [ 'VIEWPAGE' + membership ];
    } else if (id.indexOf('ADMINPAGE') == 0) {
      var membership = id.substring(9);
      ticklist = [ 'VIEWPAGE' + membership, 'EDITPAGE' + membership ];
    } else if (id.indexOf('ADMINSPACE') == 0) {
      var membership = id.substring(10);
      ticklist = [ 'VIEWPAGE' + membership, 'EDITPAGE' + membership, 'ADMINPAGE' + membership ];
    }
  }
  for ( var i = 0; i < ticklist.length; i++) {
    var element = eXo.core.DOMUtil.findDescendantById(this.form, ticklist[i]);
    if (element && element.nodeType === 1) {
      // check for element
      if (element.tagName === "INPUT" && element.type === "checkbox") {
        element.checked = "checked";
      }
    }
  }
}