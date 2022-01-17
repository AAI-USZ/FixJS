function setUserPass(username, password) {
    if(localStorage.saveUserPass === "true" ) {
        localStorage.username = username;
        if( password != "*****" ) {
            if( password == "" ) {
                localStorage.md5password = "";
            } else {
                localStorage.md5password = b64_md5( password );
            }
            //passwordTextbox.value = "*****";
        }
    } else {
        sessionStorage.username = username;
        if( password != "*****" ) {
            if( password == "" ) {
                sessionStorage.md5password = "";
            } else {
                sessionStorage.md5password = b64_md5( password );
            }
            //passwordTextbox.value = "*****";
        }
    }
}