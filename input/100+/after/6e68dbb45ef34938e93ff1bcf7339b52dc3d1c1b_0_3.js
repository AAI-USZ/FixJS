function(){	

	var aaPageRows = this.aaaPages[this.iCurrentPage];
	
	var aaRows = [];
	
	if( typeof( aaPageRows ) == 'undefined' || aaPageRows.length == 0 ){
		aaRows.push( '<tr><td colspan="' + this.aColumns.length + '">No data to display</td></tr>')
	}
	else{
		for (var i = 0; i < aaPageRows.length; i++) {
			aaRows.push( '<tr><td>' + aaPageRows[i].join('</td><td>') + '</td></tr>' );
		}
	}

	this.oTableElement.find('thead').find('tr.inputs th').attr( 'colspan', this.aColumns.length );
	
	this.oTableElement.find('tfoot').find('tr.paging td').attr( 'colspan', this.aColumns.length );
	
	this.oTableElement.find('thead').find('tr.columnHeaders').html( '<th>' + this.aColumns.join('</th><th>') + '</th>' );

	this.oTableElement.find('tbody').html( aaRows.join('') );
	
	this._updateTableStructure();
}