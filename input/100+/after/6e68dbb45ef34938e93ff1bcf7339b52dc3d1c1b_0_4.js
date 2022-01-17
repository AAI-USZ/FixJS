function(){	
	var aInputs = [];
	
	if( this.bPaging ){
		
		aOptions = [ 3, 4, 10, 15, 20, 50, 100 ];
		
		aOptionStrings = [];
	
		aInputs.push( '<input type="submit" class="refresh" value="Refresh Data"></input>' );
		
		for( i = 0; i < aOptions.length; i++ ){			
			var sSelected = aOptions[i] == this.iPageRowCount ? ' selected="selected"' : '';
			
			aOptionStrings.push( '<option value="' + aOptions[i] +'"' + sSelected + '>' + 
									aOptions[i] + '</option>');
		}
				
		aInputs.push( 	'<label for="paging">Records Per Page</label>' + 
						'<select class="paging"> ' + 
						aOptionStrings.join('') + '</select>' );
	}
	
	if( this.bSearchable ){
		aInputs.push( 	'<form class="search">' +
							'<input type="text" name="term" ' + 
								'value="' + this.sSearchTerm + '"></input>' +
								'<input type="submit" value="Search"></input>' +
						'</form>');
	}
	
	var sHead = 	'<thead>' +
						'<tr class="inputs"><th>' + 
								aInputs.join('') + '</th></tr>' +
						'<tr class="columnHeaders"></tr>' + 
					'</thead>';
	
	var aPagingElements = [];
	
	if( this.bPaging ){
		
		aPagingElements.push( 'Page <span class="paging-current-page"></span> ' +
									'of <span class="paging-total-pages"></span>' );

		aButtonNames = ['first', 'previous', 'next', 'last'];
		
		for( i = 0; i < aButtonNames.length; i++ ){
			var sName = aButtonNames[i];
			
			aPagingElements.push( '<a class="paging-btn paging-btn-' + sName + '">' + sName.charAt(0).toUpperCase() + sName.slice(1) + '</a>' );
		}
	}
	
	var sFoot = '<tfoot>' + 
					'<tr class="paging"><td>' + 
					aPagingElements.join('') + '</td></tr>' + 
				'</tfoot>';	
	
	var sBody = '<tbody></tbody>';
	
	
	this.oTableElement.html( sHead + sFoot + sBody );
	
	//TODO determine if ui is good for this or not
	//this.oTableElement.resizable();
	
}