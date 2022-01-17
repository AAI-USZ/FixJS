function(hidden) {
     if (hideTimeout) {
       clearTimeout(hideTimeout);
       hideTimeout = null;
     }

     if (autoHideDelay > 0 && !hidden) {
       entered = 1;
       mouseLeave();
     }

     entered = 0;
   }