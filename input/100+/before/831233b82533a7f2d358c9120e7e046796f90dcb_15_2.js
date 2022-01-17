function() {

	var active_editable_obj = this.getBaseElement();

	if(!active_editable_obj){
		return;
	}
	
	var that = this;
      
        var headers = active_editable_obj.find(this.headingselector);

		if ( typeof headers == "undefined" || headers.length == 0 ) {
           return;
      }

      var base_rank = parseInt(headers[0].nodeName.substr(1));
      var prev_rank = null;
      var current_annotation = [];
      var annotation_pos = 0;

      // initialize the base annotations
      for ( var i=0; i < (6 - base_rank) + 1; i++ ) {
          current_annotation[i] = 0; 
      }
      
      headers.each(function(){
	// build and count annotation only if there is content in this header
	if( that.hasContent(this) ) {

       		var current_rank = parseInt(this.nodeName.substr(1));
        	if( prev_rank == null ){
          		//increment the main annotation 
          		current_annotation[annotation_pos]++;
        	}
        	//starts a sub title
        	else if ( current_rank > prev_rank ) {
          		current_annotation[++annotation_pos]++; 
        	}
        	//continues subtitles
        	else if ( current_rank == prev_rank ) {
          		current_annotation[annotation_pos]++; 
        	}
        	//goes back to a main title
        	else if ( current_rank < prev_rank ) {
          		var current_pos = current_rank - base_rank;
          		for( var j=annotation_pos; j > (current_pos); j-- ){
            			current_annotation[j] = 0; //reset current sub-annotation
          		}
          		annotation_pos = current_pos;
          		current_annotation[annotation_pos]++; 
        	}

        	prev_rank = current_rank;

        	var annotation_result = current_annotation[0];
        	for( var i = 1; i < current_annotation.length; i++ ){
          		if(current_annotation[i] != 0){
             			annotation_result += ("." + current_annotation[i]); 
          		} 
        	}
	
		if ( that.hasNote(this) ) {
			jQuery(this).find('span[role=annotation]').html(annotation_result); 
		} else {
			jQuery(this).prepend("<span role='annotation'>" + annotation_result + "</span> ");
		}
	} else {
		// no Content, so remove the Note, if there is one
		if ( that.hasNote(this) ) {
			jQuery(this).find('span[role=annotation]').remove();
		}
		
	}

      })
     }