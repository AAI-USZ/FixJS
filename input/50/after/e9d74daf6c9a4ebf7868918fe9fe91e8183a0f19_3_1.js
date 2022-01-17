function(ev){
			var r = checkIfOverArray(ev,this.gridRef.items);
			if(r>-1) this.gridRef.items[r].drawWall(true);
		}