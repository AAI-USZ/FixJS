function(wrapper, data) {
				$(wrapper).css('padding','5px 0px');
				var link = $ln(wrapper,cstr(data.name), function() { loaddoc("Address", this.dn); }, {fontWeight:'bold'});
				link.dn = data.name
				
				$a(wrapper,'span','',{marginLeft:'5px', color: '#666'},(data.is_primary_address ? '[Primary]' : '') + (data.is_shipping_address ? '[Shipping]' : ''));
				$a(wrapper,'div','',{marginTop:'5px', color:'#555'}, 
					(data.address_line1 ? data.address_line1 + '<br />' : '') + 
					(data.address_line2 ? data.address_line2 + '<br />' : '') + 
					(data.city ? data.city + '<br />' : '') + 
					(data.state ? data.state + ', ' : '') + 
					(data.country ? data.country  + '<br />' : '') + 
					(data.pincode ? 'Pincode: ' + data.pincode + '<br />' : '') + 
					(data.phone ? 'Phone: ' + data.phone + '<br />' : '') + 
					(data.fax ? 'Fax: ' + data.fax + '<br />' : '') + 
					(data.email_id ? 'Email: ' + data.email_id + '<br />' : ''));			
			}