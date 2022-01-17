function() {
    var store = new Memory({data:this.deviceList, idProperty: "name"});
    this.select.labelAttr = "name";
    this.select.setStore(store);
		this.select.set("value", this.device);
	}