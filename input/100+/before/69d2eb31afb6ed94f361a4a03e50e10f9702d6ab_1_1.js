function(data1, data2, data3, timezone, dst_status){
				$('input[name=net_name]').attr('value', data1[0].wl0_ssid);
				wl_password_status = data3[0].wl0_security_mode != 'disabled';
			
				//Set Wireless Password and check box
				if(wl_password_status){
					console.log('1')
					$('input[name=no_net_pw]').attr('checked', false);
					$('input[name=net_pw]').attr('value', data2[0].wl0_wpa_psk);
					
				}else{
					console.log('2')
					$('input[name=no_net_pw]').attr('checked', true);
					$('input[name=net_pw]').attr('disabled','disabled');
				}
				if(dst_status[0].tm_dst==='1'){
					$('input[name=auto_daylight]').attr('checked', true);
				}
				$('select[name=tm_sel]').val(timezone[0].tm_sel);

	}