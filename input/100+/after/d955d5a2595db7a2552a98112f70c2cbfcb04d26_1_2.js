function send_request(){
  if (typeof jQuery  == 'undefined') {
     document.getElementById('status').innerHTML = "jquery not found....";
  }

  document.getElementById('status').innerHTML = "Sending request..."
 $.ajax({
  // url: "http://localhost:3000/researches?callback=openTab",
  url: "http://googlesupport.heroku.com/researches?callback=openTab",
  type: "POST",
  data: {"bookmarks" : links, "r" : guid},
  dataType: "json",
  success: function(obj){openTab(obj);},
  error: function(jqXHR, textStatus, errorThrown){document.getElementById('status').innerHTML = textStatus+' '+errorThrown;}
  });

}