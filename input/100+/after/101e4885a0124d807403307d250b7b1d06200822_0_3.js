function(hasit){

			if ( !hasit ) {
				gentle.loadLocalPlugins ( callback ) ;
				return ;
			}
	
			// We cannot just assign the stored item, because of missing class methods
			// Each sequence object needs to be reconstructed individually
			me.storage.getItem('sequences',function(gi1){
				var tmpseq = JSON.parse ( gi1 ) ;
				gentle.sequences = [] ;
				$.each ( tmpseq , function ( k , v ) {
					if ( v.typeName == 'dna' ) {
						var seq = new SequenceDNA () ;
						seq.seedFrom ( v ) ;
						gentle.sequences[k] = seq ;
					} else if ( v.typeName == 'designer' ) {
						var seq = new SequenceDesigner () ;
						seq.seedFrom ( v ) ;
						seq.typeName = 'designer' ;
						gentle.sequences[k] = seq ;
					} else {
						console.log ( 'UNKNOWN LOCAL STORAGE SEQUENCE TYPENAME ' + v.typeName ) ;
					}
				} ) ;
				
				// Now show last sequence, if any
				gentle.current_sequence_entry === undefined ;
		
				if ( gentle.sequences.length > 0 ) {
					gentle.updateSequenceList() ;
					me.storage.getItem('last_entry',function(gi2){
						gentle.showSequence ( gi2 ) ;
					} ) ;
				}
				
				gentle.loadLocalPlugins ( callback ) ;
			} ) ;
		}