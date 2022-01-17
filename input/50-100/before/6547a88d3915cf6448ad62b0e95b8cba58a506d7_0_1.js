function(table,td,cellIndex,rec,tr,rowIndex){
		if(rec.get('data'+cellIndex)){ // si existe mina la explotamos
			rec.data['data'+cellIndex] = 3;
			Ext.Msg.alert(':(','kaboooom!.');
		}
		else{
			rec.data['data'+cellIndex] = 4; // si no existe mina se trata de una banderia verde	
		}
		table.refresh();
	}