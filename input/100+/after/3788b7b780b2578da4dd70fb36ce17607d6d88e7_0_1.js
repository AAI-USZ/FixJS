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
      var error_label;
      var error_message;
      if (json){
        error_label = "groongaでエラーが発生しました。";
        error_message = json[0][3] + "(" + json[0][0] + ")";
      } else if (ajax) {
        error_label = "通信エラーが発生しました。";
        error_message = "" + ajax.status + ": " + ajax.statusText;
      } else {
        error_label = "通信エラーが発生しました。";
        error_message = "";
      }
      $("<div />")
        .append($("<div />").text(error_label))
        .append($("<div />").text(error_message))
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