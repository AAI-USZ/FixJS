function animateScrollToLink (section) {
    
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
        var screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width,
            scrollYPos = section.parentNode.offsetTop - height - 20;
            
        if(screenWidth < 480){ 
          window.scrollTo(0, scrollYPos); // No animation on small screens (long length)
        } else {
          scrollTo(section.parentNode.offsetTop - height - 20); 
        }
        event.preventDefault();
    }