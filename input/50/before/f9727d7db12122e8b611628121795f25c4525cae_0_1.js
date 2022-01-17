function( successCallback, failureCallback ) {


    return cordova.exec(successCallback,      //Callback which will be called when directory listing is successful
              failureCallback,       //Callback which will be called when directory listing encounters an error
              'GCMPlugin',        //Telling Cordova that we want to run "DirectoryListing" Plugin
              'unregister',             //Telling the plugin, which action we want to perform
              [{ }]);          //Passing a list of arguments to the plugin,
}