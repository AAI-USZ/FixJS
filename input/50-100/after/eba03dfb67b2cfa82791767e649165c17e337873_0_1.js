function() {
			var mac = this[2],
				device = {
				'name': this[0] !== "" ? this[0] : "device_"+this[2].substr(12),
 				'ip': this[1], 
				'mac': this[2]};

			devices.push(device);
			unassigned.push(device);		
			mac_addrs[mac] = device;
		}