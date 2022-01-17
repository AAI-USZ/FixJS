function(padID, text, callback)
{    
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