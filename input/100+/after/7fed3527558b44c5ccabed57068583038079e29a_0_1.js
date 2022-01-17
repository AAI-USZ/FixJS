function (w) {
		
		var conn = Database.db.getConnection('main');
		
		// getting entity from db
		if ( w.edit == 'favorites' )
			var where = ' WHERE favourite = 1';
		else if ( w.edit == 'push' )
			var where = ' WHERE push = 1';
		else
			return;
			
		var uids = [];
		var nodes = [];
		var rows = conn.query("SELECT uid FROM board_children" + where);
		
        while (rows.isValidRow()) {
            uids.push(rows.fieldByName('uid'));
            rows.next();
        }
        rows.close();
        
        nodes = Database.entity.db('main', 'board_children').loadMultiple(uids, ['title'], true);
        /*for (var num = 0, numNodes = nodes.length; num < numNodes; num++) {
        	
        }*/
       
       	// Create data for TableView
        var data = [];
       	
       	for (var nodeNum = 0, numNodes = nodes.length; nodeNum < numNodes; nodeNum++) {
       		
       		var node = nodes[nodeNum];
		    var nodeTitle = feri.cleanSpecialChars(node.title);
		    
		    var nodeRow = Ti.UI.createTableViewRow({
		    	uid: node.uid,
                hasDetail: false,
                hasChild: false,
                height: 50,
                layout: 'vertical',
                focusable: true,
                selectedBackgroundColor: feri.ui.selectedBackgroundColor
            });
            
            var nodeLabel = Ti.UI.createLabel({
		    	text: nodeTitle,
		    	font: {
    	            fontSize: 20,
                    fontWeight: 'bold'
                },
                left: 10,
	            top: 12,
	            right: 10,
                touchEnabled: false,
                height: 'auto'
            });
			
            nodeRow.add(nodeLabel);
            
            data.push(nodeRow);
        }
		
		// create main day window
        var listWindow = Titanium.UI.createWindow({
            id: 'listWindow',
            barColor: feri.ui.barColor,
            backgroundColor: feri.ui.backgroundColor,
            fullscreen: false,
            title: w.title
        });
        
        var tableview = Titanium.UI.createTableView({
        	data: data,
        	editable:true,
        	allowsSelectionDuringEditing:true
        });
        
        if ( !feri.isAndroid() ) {
        	
	        var edit = Titanium.UI.createButton({
	        	title:'Uredi'
			});
			
			edit.addEventListener('click', function()
			{
				listWindow.setRightNavButton(cancel);
				tableview.editing = true;
			});
			
			var cancel = Titanium.UI.createButton({
				title:'Prekliči',
				style:Titanium.UI.iPhone.SystemButtonStyle.DONE
			});
			cancel.addEventListener('click', function()
			{
				listWindow.setRightNavButton(edit);
				tableview.editing = false;
			});
			
			listWindow.setRightNavButton(edit);
		
		}
        
		listWindow.add(tableview);
		
		// event listeners
		// add delete event listener
		tableview.addEventListener('delete',function(e)
		{
			// getting entity from db
			var catData = Database.entity.db('main', 'board_children').load(e.row.uid);
			
			if ( w.edit == 'favorites' )
				catData.favourite = false;
			else if ( w.edit == 'push' )
				catData.push = false;
			
			Database.entity.db('main', 'board_children').save(catData, true);
			
		});
		

        return listWindow;
    }