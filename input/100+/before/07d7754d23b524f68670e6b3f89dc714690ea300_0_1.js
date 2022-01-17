function(){
			// see if they're logged in...
			if($('#user_id').val().length<=0){
				window.location.href = '/user/login';
				return false;
			}
			
			if($('#claim_btn').attr('name')=='single'){
				
				$('#claim-dialog').dialog({
					autoOpen: false,
					resizable: false,
					modal: true,
					buttons: {
						"Yes, Proceeed": function() {
							window.location.href = $('#claim_btn').attr('href');
							$( this ).dialog( "close" );
						},
						Cancel: function() {
							$( this ).dialog( "close" );
						}
					}
				});
				
				//Open confirmation dialog
				$( "#claim-dialog" ).dialog('open');
				
				//Respond to dialog not link
				return false;
			}
			
			var obj={ 
				"talk_id": $('#talk_id').val(),
				"talk_speaker_id": $('#claim_name_select').val()
			};
			$('#claim_select_div').css('display','block');
			$('#claim_btn').css('display','none');
			return false;
			
			$('#claim_btn').html('Sending Claim >>');

			apiRequest('talk','claim',obj, function(obj) {
				//notifications.alert(obj);
				$('#claim_btn').css('display','none');
				if(obj.msg=='Success'){
					notifications.alert("Thanks for claiming this talk! You will be emailed when the claim is approved!");
					$('#claim_select_div').css('display','none');
				}else{
					notifications.alert(obj.msg);
				}
				return false;
			});
			return false;
		}