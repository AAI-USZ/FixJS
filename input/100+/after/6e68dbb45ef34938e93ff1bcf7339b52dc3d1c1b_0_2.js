function(){
	
	var oDynamicTable = this;
	
	this.oTableElement.find('.refresh').click( function(){
		oDynamicTable.render();
	});

	if( this.bPaging ){
		this.oTableElement.find('select.paging').change( function(){
			oDynamicTable.iPageRowCount = $(this).find('option:selected').val();
			oDynamicTable.render();
		});
		
		this.oTableElement.find('a.paging-btn').click(function(event){
			event.preventDefault();
		});
			
		this.oTableElement.find('a.paging-btn-first').click(function(){
			oDynamicTable.iCurrentPage = 0;
			oDynamicTable.render();
		});
		
		this.oTableElement.find('a.paging-btn-previous').click(function(){
			oDynamicTable.iCurrentPage = oDynamicTable.iCurrentPage - 1;
			oDynamicTable.render();
		});
			
		this.oTableElement.find('a.paging-btn-next').click(function(){
			oDynamicTable.iCurrentPage = oDynamicTable.iCurrentPage + 1;
			oDynamicTable.render();
		});
	
		this.oTableElement.find('a.paging-btn-last').click(function(){
			oDynamicTable.iCurrentPage = oDynamicTable.aaaPages.length - 1;
			oDynamicTable.render();
		});
	}
	
	if( this.bSearchable ){
		this.oTableElement.find('form.search').submit( function(event){
			event.preventDefault();
			
			oDynamicTable.sSearchTerm = this.term.value;
			oDynamicTable.render();
		});
	}
	
	if( this.bDraggable ){
		//TODO @see http://docs.jquery.com/UI/Draggable
		// ask if using jquery ui is acceptable or not
	}
	
	if( this.bTableResizable ){
		//TODO @see http://robau.wordpress.com/2011/06/09/unobtrusive-table-column-resize-with-jquery/
	}
	
	if( this.bColumnsResizeable ){
		//TODO @see http://robau.wordpress.com/2011/06/09/unobtrusive-table-column-resize-with-jquery/
	}
}