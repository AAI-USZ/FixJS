function (username, password) {
        Util.logoutUser(); //Delete existing logged in sessions
        //Check login and save to localStorage if valid
        var xmlReq = new XMLHttpRequest();
        xmlReq.open("GET", HOST + '/ws/rest/v1/session', false);
        xmlReq.setRequestHeader("Accept", "application/json");
        xmlReq.setRequestHeader("Authorization", "Basic " + window.btoa(username + ":" + password));
        xmlReq.send();
        if (xmlReq.status = "200") {
        var authenticated = Ext.decode(xmlReq.responseText).authenticated;
        if (authenticated) {
                    localStorage.setItem("basicAuthHeader", "Basic " + window.btoa(username + ":" + password));
                } else {
                    localStorage.removeItem("basicAuthHeader");
                }
        }            
    }