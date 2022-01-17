function mouseLeave() {
     --entered;
     console.log(el.id + ": mouseleave " + entered);
     if (entered == 0) {
       clearTimeout(hideTimeout);
       hideTimeout = setTimeout(doHide, autoHideDelay);
     }
   }