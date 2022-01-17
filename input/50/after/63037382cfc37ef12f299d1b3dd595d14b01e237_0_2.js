function mouseLeave() {
     --entered;
     if (entered == 0) {
       clearTimeout(hideTimeout);
       hideTimeout = setTimeout(doHide, autoHideDelay);
     }
   }