function ListView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var db = Titanium.Database.install('db/r3.sqlite','r3.sqlite');

	var results = [];

    //Get sponsors from database
    var resultSet = db.execute('SELECT * FROM sponsors ORDER BY name ASC');
    while (resultSet.isValidRow()) {
		results.push({
		    id: resultSet.fieldByName('rowid'),
			title: resultSet.fieldByName('name'),
			details: resultSet.fieldByName('details'),
			hasChild: true,
			className: 'sponsor',
			height: 40
		});
    	resultSet.next();
    }
    resultSet.close();
	
	var table = Ti.UI.createTableView({
		data: results
	});
	
	self.add(table);
	
	//add behavior
	table.addEventListener('click', function(e) {
		self.fireEvent('itemSelected', {
			name:e.rowData.title,
			position:e.rowData.position
		});
	});
	
	return self;
}