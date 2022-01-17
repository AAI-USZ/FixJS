function(numAttributeComponents, numAttributeBitsPerComponent,
                                            numAttributeBitsPerLevel, refinementDataURLs, refinementCallback,
                                            attributeWriteOffset, strideWriting) {
	var attributeReadOffset = [];
	var i, off;	
	var refinementBuffers;
	var self = this;

	if (numAttributeBitsPerComponent.length >   0 								&&		
		numAttributeBitsPerComponent.length === numAttributeComponents.length 	&&
		numAttributeBitsPerComponent.length === numAttributeBitsPerLevel.length	  ) {

		this.refinementCallback = refinementCallback;
		this.refinementDataURLs = refinementDataURLs;
		
		off = 0;
		for (i = 0; i < numAttributeBitsPerComponent.length; ++i) {
			attributeReadOffset[i] = off;			
			off 			 	  += numAttributeBitsPerLevel[i];
		}
		
		this.worker.postMessage({cmd 		 	   		  : 'setAttributes',										  
								 numAttributeComponents 	    : numAttributeComponents,
								 numAttributeBitsPerComponent : numAttributeBitsPerComponent,											  
								 numAttributeBitsPerLevel 	  : numAttributeBitsPerLevel,
								 attributeReadOffset  		    : attributeReadOffset,
								 attributeWriteOffset		      : attributeWriteOffset,
								 strideWriting				        : strideWriting,
                 refinementDataURLs           : refinementDataURLs});	

	} else {
		 x3dom.debug.logError('Unable to initialize bit composer: the given attribute parameter arrays are not of the same length.');
	}
  
  this.refine(new ArrayBuffer(0));
 }