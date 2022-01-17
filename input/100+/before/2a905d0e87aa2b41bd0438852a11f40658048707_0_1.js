function (caller, queryURL, getpassword, metod ){ 

  function binder(aMsg) {
    try {
      caller.mOperationBind.init(caller.mConnection, 
          caller.generateGetTargetsBoundCallback(caller, queryURL, getpassword, metod), null);
      
      var pw = getpassword(queryURL, aMsg);
      if ( pw == null ) return;
      caller.mOperationBind.simpleBind(pw);
    } catch (e) {
      dumperrors("init error: " + e + "\n" + e.stack + "\n");
      return
    }
  }


  function getTargetsBoundCallback () {}
  getTargetsBoundCallback.prototype = { 
    QueryInterface: function QI(iid) {
                      if (iid.equals(Components.interfaces.nsISupports) ||
                          iid.equals(Components.interfaces.nsILDAPMessageListener))
                        return this;
                      
                      throw Components.results.NS_ERROR_NO_INTERFACE;
                    },

    onLDAPMessage: function (aMsg) {
                     if (aMsg.type != aMsg.RES_BIND) {
                       debugldapsource("bind failed\n");
                       throw Error("Bind failed");
                       return;
                     }
                     
                     caller.mBinded = 0;

                     if (aMsg.errorCode == Components.interfaces.nsILDAPErrors.SUCCESS )  {
                       debugldapsource("binded\n");
                       caller.mBinded = 1;
                       metod(aMsg);
                     } else {                    
                       caller.mFinished = 0;
                       binder(aMsg);                       
                     }
                   },

    onLDAPInit: function(aConn, aStatus) {
                  if (!Components.isSuccessCode(aStatus)) {
                    throw aStatus;
                  }

                  debugldapsource ("init oper\n");
                  binder();
                  debugldapsource ("created operation\n");
                  return;
                }
            }
            
            return getProxyThread(new getTargetsBoundCallback(), Components.interfaces.nsILDAPMessageListener);
}