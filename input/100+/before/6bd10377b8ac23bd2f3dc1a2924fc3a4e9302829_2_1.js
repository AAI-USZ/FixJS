function ListView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var db = Titanium.Database.install('db/r3.sqlite','r3.sqlite');
	var results = [], header = '';
	
    //Get certifications from database
    var resultSet = db.execute('SELECT * FROM certifications ORDER BY schedule_id ASC');
    while (resultSet.isValidRow())
    {
    	results.push
    	({
    		id: resultSet.fieldByName('id'),
    		cert: resultSet.fieldByName('name'),
    		description: resultSet.fieldByName('description'),
    		room_num: resultSet.fieldByName('room_num'),
    		hasChild: true,
    		height: 40
        });
    	
    	resultSet.next();
    	
    };
    
	resultSet.close();

	var table = Ti.UI.createTableView
	({
		data: results
	});
	
	self.add(table);
	
	
	//add event listener
	table.addEventListener('click', function(e) {
		self.fireEvent('itemSelected', {
			name:e.rowData.cert				
		});
	});
	
	return self;
}