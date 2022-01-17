function animateScrollToLink (event, section) {
    
        var parent = event.target.parentNode,
          isSubnavLink = false;
            
        while(parent){
          if (parent.id === subnavId){
              isSubnavLink = true;
              break;
          }
          parent =  parent.parentNode;
        }
        
        if(isSubnavLink) {
          closeSubnav()
        }
            
        // Set the location hash and reset the browser scroll position.
        window.location.hash = event.target.hash;
        window.scrollTo(0, offset);

        // Animate to the element.
        var scrollYPos = section.parentNode.offsetTop - height - 20;
        
        if(narrowScreen){
          window.scrollTo(0, scrollYPos); // No animation on small screens (long length), or on IE // TO DO fix IE to work with scrollTo #59
        } else {
          scrollTo(scrollYPos); 
        }
        event.preventDefault();
    }