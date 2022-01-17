function (key_id, value) {
  var webinosDemo = common.webinosConfigPath();
  fs.writeFile((webinosDemo+ "/keys/"+key_id), value, function(err) {
    if(err) {
      log("ERROR", "[CONFIG] Error saving key " + err);
    } else {
      log("INFO", "[CONFIG] Saved key file @@ " +key_id);
    }
  });
}