function() {
		var mac_addrs = {};

		$.each(tomato_env.vars['devlist'], function() {
			var mac = this[2],
				device = {
				'name': this[0] !== "" ? this[0] : "device_"+this[2].substr(12).toUpperCase(),
 				'ip': this[1], 
				'mac': this[2].toLowerCase()};

			devices.push(device);
			unassigned.push(device);		
			mac_addrs[mac] = device;
		});
		

		$.each(groups, function(i, group) {
			$.each(group.devices, function(j, device) {
				unassigned = unassigned.filter(function(a){
					if(device.mac === a.mac){
						return false;
					}
						return true;
				})

				/*this_device = mac_addrs[device.mac];
				if(this_device) {
					group.devices[j] = this_device;
					unassigned.splice($.inArray(this_device, unassigned), 1);
				}*/					

			});
		});		
	}