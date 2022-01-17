function (event) {
      var hashId = event.target.hash,
          section = hashId && $(hashId),
          offset  = window.scrollY,
          targetId = hashId ? hashId.substring(1, hashId.length) : null;
        
        
        if(targetId === subnavId) {
       
          event.preventDefault();
          toggleSubnav();
            
        } else if (section) {
            
          animateScrollToLink(event, section);
          
        }
        
    }