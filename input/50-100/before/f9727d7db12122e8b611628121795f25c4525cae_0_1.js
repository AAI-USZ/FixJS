function(appID, eventCallback, successCallback, failureCallback) {

  if ( typeof eventCallback != "string")    // The eventCallback has to be a STRING name not the actual routine like success/fail routines
  {
    var e = new Array();
    e.msg = 'eventCallback must be a STRING name of the routine';
    e.rc = -1;
    failureCallback( e );
    return;
  }

    return Cordova.exec(successCallback,      //Callback which will be called when directory listing is successful
              failureCallback,       //Callback which will be called when directory listing encounters an error
              'GCMPlugin',        //Telling Cordova that we want to run "DirectoryListing" Plugin
              'register',             //Telling the plugin, which action we want to perform
              [{ email: senderEmail, ecb : eventCallback }]);          //Passing a list of arguments to the plugin,
                          // The ecb variable is the STRING name of your javascript routine to be used for callbacks
                          // You can add more to validate that eventCallback is a string and not an object
}