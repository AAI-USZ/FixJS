function DynamicTable( oSettings ){
	 
	 //set up the default configuration
	 this.oTableElement = null;
	 this.sUrl = null;
	 this.iWidth = null;
	 this.iHeight = null;
	 this.bPaging = false;
	 this.bDraggable = false;
	 this.bDraggable = false;
	 this.bTableResizeable = false;
	 this.bColumnsResizeable = false;
	 this.bSearchable = false;
		
	 //the search term entered in the search box, if enabled
	 this.sSearchTerm = '';	
	
	 //the number of records to display on a page
	 this.iPageRowCount = 3;
	
	 //the page to render
	 this.iCurrentPage = 0;
	 
	 //merge the settings into the DymanicTable object
	 $.extend( this, oSettings );
	
	 //an array of column names
	 this.aColumns = [];
	
	 //holds 2 dimensional array. pages with rows
	 this.aaaPages = [];
	
	 //holds the total records retrieved from data source
	 this.iTotalRecords = 0;
	
	 //holds the number of records filtered after search
	 this.iFilteredRecords = 0;
	
	 this._prepareTable();
}