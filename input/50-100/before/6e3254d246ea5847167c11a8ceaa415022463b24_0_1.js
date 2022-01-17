function() {
    var store = new Memory({data:this.deviceList});
    this.combobox.set("store", store);
		this.combobox.set("value", this.device);
	}