function(id) {
  var unticklist = [];
  if (id) {
    if (id.indexOf('VIEWPAGE') == 0) {
      var membership = id.substring(8);
      unticklist = [ 'EDITPAGE' + membership, 'ADMINPAGE' + membership, 'ADMINSPACE' + membership ];
    } else if (id.indexOf('EDITPAGE') == 0) {
      var membership = id.substring(8);
      unticklist = [ 'ADMINPAGE' + membership, 'ADMINSPACE' + membership ];
    } else if (id.indexOf('ADMINPAGE') == 0) {
      var membership = id.substring(9);
      unticklist = [ 'ADMINSPACE' + membership ];
    }
  }
  for ( var i = 0; i < unticklist.length; i++) {
    var element = gj(this.form).find('#' + unticklist[i])[0];
    if (element && element.nodeType === 1) {
      // check for element
      if (element.tagName === "INPUT" && element.type === "checkbox") {
        element.checked = "";
      }
    }
  }
}