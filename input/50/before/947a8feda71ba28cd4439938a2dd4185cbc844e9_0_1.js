function hasPopped () {
     if ('state' in window.history) {
       return true
     } else {
       return popped
     };
   }