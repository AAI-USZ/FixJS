function(item){

		var path = [];

		path.splice(0, 0, item.id[0]);

		var parentItem = item.parentItem && item.parentItem[0];

		while(parentItem){

			path.splice(0, 0, parentItem.id[0]);

			parentItem = parentItem.parentItem && parentItem.parentItem[0];;

		}

		path.splice(0, 0, 'StoryRoot');

		return path;

	}