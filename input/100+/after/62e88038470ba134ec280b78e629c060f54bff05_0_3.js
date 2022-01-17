function resetSubnav() {
        
        
        var halfWindowWidth = window.innerWidth / 2,
            navOffset = subnavWidth + subnavMargin + halfContentWidth,
            navOffScreen = navOffset > halfWindowWidth,
            subnavOffset = navOffScreen ? (halfWindowWidth - subnavContainer - subnavMargin - halfContentWidth + subnavWidth ) + "px" : (halfWindowWidth - subnavContainer - halfContentWidth - subnavMargin) + "px", 
            toggleClass = navOffScreen ? 'add' : 'remove';
        
        subnav.classList[toggleClass]('off-left');
        cloned.classList[toggleClass]('show-subnav-button');
        navigation.classList[toggleClass]('show-subnav-button');
        
        if(navOffScreen === false) {
          closeSubnav();
        }
        
        subnavOffset = subnav.classList.contains("show-nav") ? openSubnavOffset  : subnavOffset; // set on open via button
        
        subnav.style.left = subnav.classList.contains("float")  ? subnavOffset  : null; 
        
    }