function() {
			var mac = this[2],
				device = {'name': this[0], 'ip': this[1], 'mac': this[2]};

			devices.push(device);
			unassigned.push(device);		
			mac_addrs[mac] = device;
		}