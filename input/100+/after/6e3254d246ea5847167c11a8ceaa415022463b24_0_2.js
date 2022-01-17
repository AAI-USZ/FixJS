function(declare, Action, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, CompoundCommand, RemoveCommand, Workbench, Memory, templateString, veNls, actionNLS, commonNls){


declare("davinci.ve.actions.ChooseDeviceActionContent", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
  templateString: templateString,
	widgetsInTemplate: true,

	select: null,

	device: null,
	deviceList: null,

	postCreate: function() {
    var store = new Memory({data:this.deviceList, idProperty: "name"});
    this.select.labelAttr = "name";
    this.select.setStore(store);
		this.select.set("value", this.device);
	},

	getValue: function() {
		return this.select.get("value")
	}
});	

return declare("davinci.ve.actions.ChooseDeviceAction", [Action], {

	
	run: function(selection){
		if (!this.isEnabled(null)){ return; }
		var e = davinci.Workbench.getOpenEditor();
		var okToSwitch = true;
		if (e && e.isDirty){
			//Give editor a chance to give us a more specific message
			var message = e.getOnUnloadWarningMessage();
			if (!message) {
				//No editor-specific message, so use our canned one
				message = dojo.string.substitute(veNls.filesHasUnsavedChanges, [e.fileName]);
			}
		    okToSwitch=confirm(message);
		}                                                     
		if (okToSwitch){
			this.showDevices(); 
		}
	},

	isEnabled: function(selection){
		var e = davinci.Workbench.getOpenEditor();
		return e.declaredClass == 'davinci.ve.PageEditor'; // this is a hack to only support undo for theme editor for 0.5
	},

	showDevices: function(){

		var e = davinci.Workbench.getOpenEditor();
		var c = e.getContext();
		var device = c.visualEditor.deviceName;
		var deviceList = [{name: "none"}, {name: "iphone"}, {name: "ipad"}, {name: "android_340x480"}, {name: "android_480x800"}, {name: "androidtablet"}, {name: "blackberry"}];

		var ui = new davinci.ve.actions.ChooseDeviceActionContent({device: device, deviceList: deviceList});

		function _callback() {
			var e = davinci.Workbench.getOpenEditor();
			var context = e.getContext();
			context.visualEditor.setDevice(ui.getValue());
			e._visualChanged();
		}

		Workbench.showDialog(veNls.chooseDeviceSilhouette, ui, null, dojo.hitch(this, _callback), actionNLS.select);
	}
});

}