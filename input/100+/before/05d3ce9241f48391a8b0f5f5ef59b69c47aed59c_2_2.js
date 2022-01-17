function( $ ) {
  
  $.extend({
    reference: function (linkEl, event) {
	  
	  // find matching collections from data-referenceCollections
	  
	  // display the reference panel
	  
	  console.log($(linkEl).data('referenceTriggers')[event.type])
	  
    }
  });
  
  $.fn.reference = function(event){
    $.reference(this, event);
    return $(this);
  }
  
}