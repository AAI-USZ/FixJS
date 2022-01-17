function() {
    //this.id format: "expand_NNNNNNNNNN"
    var a = this.id.split("expand_");
    if (a.length > 1) {
      var docId = a[1];
      $("#detail_"+docId).toggle();
      if( $("#detail_"+docId).is(":hidden") ) {
        $("#expand_"+docId).attr("class", "icon-plus");
      }
      else {
        $("#expand_"+docId).attr("class", "icon-minus");
      }
    }
  }