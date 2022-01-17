function makeGetRequest(runID) {
    //make a connection to the server ... specifying that you intend to make a GET request
    //to the server. Specifiy the page name and the URL parameters to send
    http.open('get', 'myphp.php?id=' + runID);

    //assign a handler for the response
    http.onreadystatechange = processResponse;

    //actually send the request to the server
    http.send(null);
}