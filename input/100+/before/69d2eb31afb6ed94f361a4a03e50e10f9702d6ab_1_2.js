function() {
			
			if( $("input[name=net_pw]").val().length < PASSWORD_MIN_LENGTH && !$('.no_net_pw').attr('checked')) { //Checks wireless password length
				alert('Wireless password must be 8 or more characters long.')
			}else{
				if($('input[name=router_pw1]').val() != $('input[name=router_pw2]').val()) { //checks
					alert('Router passwords do not match.')
				}else{

					tomato_env.set('wl0_ssid',$('input[name=net_name]').val());
					
					//Turns wireless encryption on or off and sets password
					if($('.no_net_pw').attr('checked')){                      
						tomato_env.set('wl0_security_mode','disabled');
						
					}else{
						tomato_env.set('wl0_security_mode','wpa2_personal');
						tomato_env.set('wl0_crypto','aes');
						tomato_env.set('wl0_wpa_gtk_rekey','3600');
						tomato_env.set('wl0_wpa_psk',$('input[name=net_pw]').val());
						
					}

					
					//Time Zone settings
					tomato_env.set('tm_sel', $('select[name=tm_sel]').val()); 
					if ($('.auto_daylight').attr('checked')) {
						tomato_env.set('tm_dst','1');	
					}else{	
						tomato_env.set('tm_dst','0');	
					}
				
					//Save router password, if one set
					if($('input[name=router_pw1]').val() != ''){   
						console.log('pwset');
						tomato_env.set('set_password_1',$('input[name=router_pw1]').val());
						tomato_env.set('set_password_2',$('input[name=router_pw2]').val());
					}
				
					tomato_env.set('_service','*'); //Full restart on apply
					$.fancybox('<div class="apply_changes_box">Saving Changes…</div>',{helpers:  { overlay : {closeClick: false} }, closeBtn : false });
					$.when(tomato_env.apply()).then(function() {
					setTimeout('$.fancybox.close()', 7000);
			  	
			  });
			}
		}
	}