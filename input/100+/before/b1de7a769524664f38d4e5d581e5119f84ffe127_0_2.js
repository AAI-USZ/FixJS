function vhtml(field) {
    var f = aData[colNumLookup[field]];
    if (!f || f == 'None') {
      return;
    }
    
    return '<div><b>' + aoColumns[colNumLookup[field]]['sTitle'] +
      '</b>: ' + f + '</div>';
  }