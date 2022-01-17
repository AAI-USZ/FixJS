function(){
		var object = {};
		object.hash  = jsmatrix.hash();

		object.set_item = function(key,item){
			this.hash.set(key,item);
			item.key = key;
			item.row = this.row;
			item.col = this.col;
			item.cell = this;			
		}

		object.get_item = function(key){
			return this.hash.get(key);
		}
		
		object.remove_item = function(key){
			var item = this.hash.get(key);
			this.hash.remove(key);
			item.row = undefined;
			item.col = undefined;
			item.cell = undefined;			
		}

		object.size = function(){
			return this.hash.size();
		}

		object.has_item = function(key){
			var boolean = false;
			if ( this.hash.get(key) != undefined ){
				boolean = true;
			}
			return boolean;
		}

		object.has_item = function(){
			var boolean = false;
			if ( this.hash.length() != 0 ){
				boolean = true;
			}
			return boolean;
		}

		object.right = function(){
			return this.matrix.get_cell(this.row,this.col+1);
		}

		object.left = function(){
			return this.matrix.get_cell(this.row,this.col-1);
		}

		object.up = function(){
			return this.matrix.get_cell(this.row-1,this.col);
		}

		object.down = function(){
			return this.matrix.get_cell(this.row+1,this.col);
		}

		object.move = function(item, cell){
			this.remove_item(item.key);
			cell.set_item(item.key, item);
		}


		return object;
	}