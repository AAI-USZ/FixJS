function(device) {
			this.mobile = true;
			this.found.device = device;
			this.found.browser_version = $.browser.version;
			this.found.supported_browser_version = this.s[device];
			
			if(this.s.test_mobile_os || !this.s.test_device) return;
			if(!this.s[device] || ($.browser.version < this.s[device])) this.devive_not_supported(device);
		}