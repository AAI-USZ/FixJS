function(padID, text, callback)
{    
  //text is required
  if(typeof text != "string")
  {
    callback(new customError("text is no string","apierror"));
    return;
  }

  //get the pad
  getPadSafe(padID, true, function(err, pad)
  {
    if(ERR(err, callback)) return;
    
    //set the text
    pad.setText(text);
    
    //update the clients on the pad
    padMessageHandler.updatePadClients(pad, callback);
  });
}