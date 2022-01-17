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
		
		this.oColumnHandleData = null;

		//add some helper functions to jQuery
		jQuery.fn.getColumnPrevious = function() {
			console.log($(this));
		};
		jQuery.fn.getColumnNext = function() {
			console.log($(this));
		};
		
		// add the column handle pointer
		this.oTableElement.find('th, td').mouseover( function( event ){
			//TODO if the mouse is close to the column border, change the poiner image
		});
		
		//FIXME: unable to locate the th elements
		console.log( this.oTableElement.find('tr.columnHeaders th') );
		// store some data about the column being resized
		this.oTableElement.find('tr.columnHeaders th').mousedown( function( event ){
			
			var oElementLeft, oElementRight;
			
			var bThisIsLeft = ( event.pageX > $(this).offset().left() + 3 );
			
			var oElementLeft = bThisIsLeft ? $(this) : $(this).getColumnNext(); // get element to the right
			
			var oElementRight = bThisIsLeft ? $(this).getColumnPrevious() : $(this); // get element to the left
			
			oDynamicTable.oColumnHandleData = {
					iColumnIndex: 	$(this).parent().children().index($(this)),
					oElementLeft: 	bThisIsLeft ? $(this) : $(this).getColumnNext(),
					oElementRight: 	bThisIsLeft ? $(this).getColumnPrevious() : $(this),
					iStartX: 		event.pageX
			};
			
			console.log( oDynamicTable.oColumnHandleData );
		});
		
		$(document).mousemove(function(e) {
	        if(oDynamicTable.oColumnHandleData != null ) {
	            $(oDynamicTable.columnHandlePressed).width(startWidth+(e.pageX-startX));
	        }
	    });
		
		$(document).mouseup(function(event){
			if( oDynamicTable.oColumnHandleData != null ){
				oDynamicTable.oColumnHandleData = null;
			}
		});
	}
}