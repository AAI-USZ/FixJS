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
			});
		});
		


		//TEST AREA - Removes the duplicates from the dev list(dev list + arp list)  This will change, but works for now.
		Array.prototype.unique = function(prop) {
    		var temp = new Array();
    		for( i = 0; i < this.length; i++) {
        		if( typeof this[i] != "undefined" && !contains(temp, this[i], prop)) {
            		temp.length += 1;
            		temp[temp.length - 1] = this[i];
        		}
    		}
    		return temp;
		}
    	
    	// Will check for the Uniqueness
		function contains(a, e, prop) {
    		for( j = 0; j < a.length; j++) {
        		if(prop) {
            		if(a[j][prop] == e[prop]) {
                		return true;
           			}
        		}
        		if(a[j] == e) {
            		return true;
        		}
    		}
    		return false;
		};

		unassigned = unassigned.unique('mac');
	
		
		//Removes Wan addresses - we may do this another way
		var re = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/;
			var temp = tomato_env.vars['lan_ipaddr'].match(re)[0];
				unassigned = unassigned.filter(function(a){
					if( temp === a.ip.match(re)[0]){
						return true;	
					}
						return false;
				})					
		}