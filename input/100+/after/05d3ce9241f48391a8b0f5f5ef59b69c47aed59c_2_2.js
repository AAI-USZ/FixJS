function( $ ) {
    $.extend({referenceThemes: []});

  $.extend({
    reference: function (linkEl, event) {
	  
		linkEl = $(linkEl);
		var linkData = linkEl.data('referenceTriggers')[event.type];
		var linkTerm = linkEl.text();
	  
	  // find matching collections from data-referenceCollections
	  $.each(linkData['collections'], function(index, id){
		  var collection = $.referenceCollections[id];
		  var term = collection.caseSensitive ? linkTerm : linkTerm.toUpperCase();
		  
		  
		  if(collection.type == 'data') {
			  console.log(collection.data[term])
		  } else if(collection.type == 'ajax') {
		  	
		  } else if(collection.type == 'custom') {
		  	
		  }
		  
		  
	  })
	  
	  // display the reference panel
	  
    }
  });
  
  $.fn.reference = function(event){
    $.reference(this, event);
    return $(this);
  }
  
}