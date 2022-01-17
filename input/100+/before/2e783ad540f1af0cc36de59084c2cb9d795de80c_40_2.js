function(list_reg, list_scr, k) {
	var store_reg = Ext.create('Screener.store.PostLists');
	var store_scr = Ext.create('Screener.store.PostLists');
	store_reg.add(list_reg);
	store_scr.add(list_scr);
	store_reg.sync();
	store_scr.sync();
	store_reg.on('write', function() {
	k=k+1;
	if(k==2){
	this.finalPatientList(store_reg, store_scr);
	}
	},this);
	store_scr.on('write', function() {
	k=k+1;
	if(k==2){
	this.finalPatientList(store_reg, store_scr);
	}
	},this);
	var a = [store_reg, store_scr];
	return a;
	}