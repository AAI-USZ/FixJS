function (event) {
      var hashId = event.target.hash,
          section = hashId && $(hashId),
          offset  = window.scrollY,
          id = hashId ? hashId.substring(1, hashId.length) : null;
        
        
        if(id === subnavId) {
       
            event.preventDefault();
            
            if(subnav.classList.contains("show-nav")){
                subnav.classList.remove("show-nav");
                subnav.style.left = null;
                content.style.left = null;
            }else{
                subnav.classList.add("show-nav");
                openSubnavOffset = ((0 - subnavContainer) + (subnavWidth + subnavMargin))  + "px"; // stored value reapplied on scroll
                subnav.style.left = subnav.classList.contains("float") ? openSubnavOffset : null; 
                content.style.left = (0 - content.offsetLeft + subnavWidth + (subnavMargin * 2)) + "px";
            }
            
        } else if (section) {
                
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
                subnav.classList.remove("show-nav");
                content.style.left = null;
            }
                
            // Set the location hash and reset the browser scroll position.
            window.location.hash = event.target.hash;
            window.scrollTo(0, offset);

            // Animate to the element.
            scrollTo(section.parentNode.offsetTop - height - 20);
            event.preventDefault();
        }
        
    }