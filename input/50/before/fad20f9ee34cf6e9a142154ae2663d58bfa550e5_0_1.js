function(data) {
    alert("Starting stream on sid " + data.sid);
    poll_server(data.sid);
  }