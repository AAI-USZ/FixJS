function(device) {
		
        var oldDevice = this.getMobileDevice() || 'none';
        if (oldDevice === device) {
            return;
        }
        this.close(); //// return any singletons for CSSFiles
        this.setMobileDevice(device);

		// dojox.mobile specific CSS file handling

        var dm = lang.getObject("dojox.mobile", false, this.getGlobal());
        if(dm && dm.deviceTheme && dm.deviceTheme.loadDeviceTheme) {
        	dm.deviceTheme.loadDeviceTheme(Silhouette.getMobileTheme(device + '.svg'));
        }
	}