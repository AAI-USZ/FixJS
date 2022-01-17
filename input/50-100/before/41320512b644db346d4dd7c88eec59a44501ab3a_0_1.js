function(responseText) {
  var response = JSON.parse(responseText + "");
  alert(JSON.stringify(response));
  builder.selenium2.rcPlayback.result.success = true;
  //builder.selenium2.rcPlayback.playNextStep(null);
}