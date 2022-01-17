function(load_data) {
    var self         = this,
        token        = new Date().getTime(),
        formString   = "",
        formObj      = {},
        showloader   = false;

    self.destroyJcrop();

    $('#output').val('pnga');        // set the preview and output values
    $('#badRecordsWarning').hide();  // hide the bad records warning
    $('#download_token').val(token); // set a token to be used for cookie

    formString = $("form").serialize();
    formObj    = $("form").serializeJSON();
    if(formObj["layers[relief]"] || formObj["layers[reliefgrey]"] || formString.length > 7000 || formObj.projection !== "epsg:4326") { showloader = true; }
    self.postData(formString, load_data, showloader);
    $.jStorage.set("do-" + token.toString(), formObj);
    self.toggleUndo(true);
  }