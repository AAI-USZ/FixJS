function (load_data) {
    var self         = this,
        token        = new Date().getTime(),
        formString   = "",
        formObj      = {};

    self.destroyJcrop();

    $('#output').val('pnga');        // set the preview and output values
    $('#badRecordsWarning').hide();  // hide the bad records warning
    $('#download_token').val(token); // set a token to be used for cookie

    formString = $("form").serialize();
    formObj    = $("form").serializeJSON();
    self.postData(formString, load_data);
    $.jStorage.set("do-" + token.toString(), formObj);
    self.toggleUndo(true);
  }