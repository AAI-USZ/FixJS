function ListView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var db = Titanium.Database.install('db/r3.sqlite','r3.sqlite');

	var results = [];

    //Get locations from database
    var resultSet = db.execute('SELECT * FROM annotations ORDER BY title ASC');
    while (resultSet.isValidRow()) {
		results.push({
            title: resultSet.fieldByName('title'),
			hasChild: true,
			className: 'annotations',
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
		});
	});
	
	return self;
}