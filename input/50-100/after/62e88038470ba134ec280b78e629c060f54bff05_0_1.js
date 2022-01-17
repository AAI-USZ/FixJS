function onScroll() {
      
      
      if (throttle) {
        return;
      }

      throttle = setTimeout(function () {
        throttle = null;
      }, 1000 / 60);
      

      var isHidden = window.pageYOffset < offset;
      
      cloned[isHidden ? 'setAttribute' : 'removeAttribute']('hidden', '');
      subnav.classList[isHidden ? 'remove' : 'add']('float');
      
      isHeaderVisible = isHidden;
      resetSubnav();
  
      return onScroll;
    }