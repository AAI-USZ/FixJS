function(item, cell){
			this.remove_item(item.key);
			cell.set_item(item.key, item);
		}