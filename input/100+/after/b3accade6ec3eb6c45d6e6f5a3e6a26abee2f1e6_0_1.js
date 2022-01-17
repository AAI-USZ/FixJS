function getOldList() {
  var someURL = "https://api-dev.bugzilla.mozilla.org/latest/bug?" +
                "product=Add-on%20SDK&resolution=---&changed_before=" +
                "672h&include_fields=id,assigned_to,summary,last_change_time";

  var request = new XMLHttpRequest();
  request.open('GET', someURL, true);
  request.setRequestHeader("Accept", "application/json");
  request.setRequestHeader("Content-Type", "application/json");
  request.onreadystatechange = function (aEvt) {
    if (request.readyState == 4) {
      if(request.status == 200) {
        //assigneeBreakdownFixed(JSON.parse(request.response));
        parseOldList(JSON.parse(request.response).bugs);
      } else {
        alert("Something with the request went wrong. Request status: " + request.status);
        document.body.removeAttribute("activeRequests");
      }
    }
  };
  request.send(null);
}