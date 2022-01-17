function setPref(pref,val) {
    var msg = new Object();
    msg["msg"] = "chgLS";
    
    switch(pref) {
        case VoluniAppPref.ACTI:
            msg[VoluniAppPref.ACTI] = val;
            break;
        case VoluniAppPref.HIDE:
            msg[VoluniAppPref.HIDE] = val;
            break;
        case VoluniAppPref.BTT:
            if($("input:checkbox[name=btt]")[0].checked)
                val = VoluniAppPref.BTT_ON;
            else
                val = VoluniAppPref.BTT_OFF;
            msg[VoluniAppPref.BTT] = val;
            break;
        case VoluniAppPref.ADAP:
            if($("input:checkbox[name=adap]")[0].checked)
                val = VoluniAppPref.ADAP_ON;
            else
                val = VoluniAppPref.ADAP_OFF;
            msg[VoluniAppPref.ADAP] = val;
            break;
    }
    
    chrome.extension.sendRequest(msg);
}