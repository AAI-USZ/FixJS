function(APP, el, autoHideDelay) {
   jQuery.data(el, 'obj', this);

   var self = this,
       WT = APP.WT,
       hideTimeout = null,
       entered = false;

   function doHide() {
     APP.emit(el, 'cancel');
   }

   this.setHidden = function(hidden) {
     if (hideTimeout)
       clearTimeout(hideTimeout);
     hideTimeout = null;
   };

   if (autoHideDelay >= 0) {
     $(el).parent().find('.Wt-popupmenu')
       .mouseleave(function() {
	   if (entered) {
	     clearTimeout(hideTimeout);
	     hideTimeout = setTimeout(doHide, autoHideDelay);
	   }
	 })
       .mouseenter(function() {
	   entered = true;
	   clearTimeout(hideTimeout);
	 });
   }
 }