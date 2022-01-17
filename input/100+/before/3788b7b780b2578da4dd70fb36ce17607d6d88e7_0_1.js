function(ajax, hide_dialog) {
    var that = this;
    var json = null;
    if (ajax) {
      json = jQuery.parseJSON(ajax.responseText);
    }
    this.hideloading();
    for ( i = 0; i < this.semaphore.length; i++) {
      this.semaphore[i].abort();
      this.semaphore.splice(i, 1);
      i--;
    }
    if ( $("#loadingdialog").size() == 0 && !hide_dialog) {
      var errtext;
      if (json){
        errtext = "groongaでエラーが発生しました。<br>" + json[0][3] + "(" + json[0][0] + ")";
      } else if (ajax) {
        errtext = "通信エラーが発生しました。<br>" + ajax.status + ajax.statusText;
      } else {
        errtext = "通信エラーが発生しました。";
      }
      $("<div />")
        .append(errtext)
        .attr("id", "loadingdialog")
        .dialog({
          title: "",
          width: 340,
          height: 160,
          minHeight: 160,
          modal: true,
          resizable: false,
          draggable: false,
          open: function() {
            $(this).parents(".ui-dialog").children(".ui-dialog-titlebar").remove();
          },
          buttons: { OK: function() { that.hideloading(); } }
        });
    }
  }