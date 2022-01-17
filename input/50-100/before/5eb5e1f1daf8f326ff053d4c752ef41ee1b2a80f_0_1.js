function() {

        Ext.create('CatHerder.view.Main', {fullscreen: true});

	var item = Ext.ModelManager.getModel('CatHerder.model.Item');
	item.load(1, {
	    success: function(record) {
		console.log('Loaded: %o',record);
		record.getCategory(function(category) {
		    console.log('Category: %o',category);
		});
	    }
	});

    }