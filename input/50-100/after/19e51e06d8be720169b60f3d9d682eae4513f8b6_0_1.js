function (divName, messages) {
    var errorMessage = document.getElementById(divName);
    var messageList = "";

    //    for (i = 0; i < messages.length; i++) {
        messageList += " - <b>" + messages.Title + "</b>, " + messages.Message + "<br />";
    //    }
    
    if (errorMessage != null) {
        errorMessage.innerHTML = "<br /><b>Oops!</b> There was a problem with your submission:<br /><br />";
        errorMessage.innerHTML += messageList;
        errorMessage.innerHTML += "<br />Please make the necessary corrections, and resubmit the form.<br />";
        errorMessage.className = "visible errormessage";
    }
}