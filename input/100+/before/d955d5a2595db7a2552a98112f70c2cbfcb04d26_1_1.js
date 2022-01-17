function() { 
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);

  var done = false;
  var days = 10;

  chrome.bookmarks.getTree(function(bookmarks) {
    printBookmarksOne(bookmarks);
    if(done){
      send_request();
    }else{
      done = true;
    }
  });


  chrome.storage.local.get("days", function(items){

      if (items["days"]) {
        days = items["days"]; 
      }

      chrome.history.search({
          'text': '',           // Return every history item....
          'startTime': (new Date).getTime() - (3600000 * 24 * days) // that was accessed less than one week ago.
        },
        function(historyItems) {
          printBookmarksOne(historyItems);
          if(done){
            send_request();
          }else{
            done = true;
          }
        });
  });
}