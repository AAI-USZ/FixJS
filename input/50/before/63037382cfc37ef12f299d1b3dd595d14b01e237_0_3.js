function mouseEnter() {
     ++entered;
     console.log(el.id + ": mouseenter " + entered);
     clearTimeout(hideTimeout);
   }