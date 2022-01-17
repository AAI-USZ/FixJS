function(){
      var headtg = document.getElementsByTagName('head')[0];
      if (!headtg) {
          return;
      }
      
      var oldlink = document.getElementsByTagName("link").item(5);
      
      var newlink = document.createElement('link');
      newlink.setAttribute("rel", "stylesheet");
      newlink.setAttribute("type", "text/css");
      newlink.setAttribute("href", "./app/app_transparent.css");
 
      headtg.replaceChild(newlink, oldlink);
    }