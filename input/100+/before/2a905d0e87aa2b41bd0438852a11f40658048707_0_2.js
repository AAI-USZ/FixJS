function (caller, metod, callbackresult) {
    /*
     * constructor
     */
    function getTargetsQueryCallback() {
    }
            
    getTargetsQueryCallback.prototype = {
        QueryInterface: function(iid) {
            if (iid.equals(Components.interfaces.nsISupports) ||
                 iid.equals(Components.interfaces.nsILDAPMessageListener))
                return this;
                
                throw Components.results.NS_ERROR_NO_INTERFACE;
            },
              
        onLDAPMessage: function (aMsg) {
            caller.mMessages[caller.mMessages.length] = aMsg;
                
            if ( aMsg.type == aMsg.RES_SEARCH_ENTRY ){
                caller.mMessagesEntry[caller.mMessagesEntry.length] = aMsg;
                caller.mMessagesEntry[aMsg.dn] = aMsg;
                
                if ( !(callbackresult == undefined)) callbackresult(aMsg);
            }
                                
            caller.mFinished++;
            if ( !(metod == undefined)) metod(aMsg);
        }
    }

    return getProxyThread(new getTargetsQueryCallback(), Components.interfaces.nsILDAPMessageListener);
}